require('colors');
var fs = require('fs');
var path = require('path');
var request = require('request');
var npmconf = require('npmconf');
var RegClient = require('npm-registry-client');
var semver = require('semver');
var async = require('async');

var table = require('text-table');
var color = require('cli-color');
var ansiTrim = require('cli-color/lib/trim');

var error = require('../lib/error');

exports = module.exports = package;
 
exports.usage = function usage(name, args) {
    args.usage('nsp package');
};


var registry;
 
function package(args) {
    var file = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(file)) {
        npmconf.load(function (err, config) {
            registry = new RegClient(config);
            var pkg = JSON.parse(fs.readFileSync(file));
            checkPackage(pkg, [], prettyOutput);
        });
    } else {
        console.error(color.green("No vulnerable modules found"));
        process.exit(0);
    }
}


// Get package
// Get versions
// max satisfy
// verify if it's vuln

function checkPackage(pkginfo, results, callback) {
    results = results || [];

    async.forEach(Object.keys(pkginfo.dependencies), function (module, cb) {
        
        registry.get(module, pkginfo.dependencies[module], function (er, data, raw, res) {
            var ver = semver.maxSatisfying(Object.keys(data.versions), pkginfo.dependencies[module]);
            if (data.versions[ver].parent) {
                data.versions[ver].parent.push(module);
            } else {
                data.versions[ver].parent = [module];
            }
            validateModule(module, ver, function (result) {
                if (result) {
                    var d = {
                        dependencyOf: data.versions[ver].parent,
                        module: module,
                        version: ver,
                        advisory: result[0]
                    };
                    results.push(d);
                }
                //console.log(data.versions[ver].dependencies)
                if (data.versions[ver].dependencies) {
                    console.log(data.versions[ver].parent);
                    checkPackage(data.versions[ver], results, function () {
                        cb();
                    });
                } else {
                    cb();
                }
            });
        });
    }, function (err) {
        callback(results);
    });
}


function validateModule(module, version, cb) {
    var url = 'https://nodesecurity.io/validate/' + module + '/' + version;
    request({
        url: url,
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        json: true 
    }, function (err, response, body) {
        if (body && body.length > 0) {
            return cb(body);
        }
        cb();
    });
}

function prettyOutput(result) {
    console.log(result);
    // Pretty output
    var opts = {
        align: [ 'l', 'c', 'c', 'l' ],
        stringLength: function (s) { return ansiTrim(s).length; }
    };

    var h = [
        [
            color.underline('Name'), color.underline('Installed'), color.underline('Patched'), color.underline('Vulnerable Dependency')
        ]
    ];
    result.forEach(function (module) {
        h.push([module.module, module.version, module.advisory.patched_versions, module.dependencyOf.join(' > ')]);
    });
    var t = table(h, opts);
    console.error(t);
    process.exit(1);

}


