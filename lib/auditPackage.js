var validateModule = require('./nspAPI').validateModule;
var RegClient = require('silent-npm-registry-client');
var npmconf = require('npmconf');
var semver = require('semver');
var async = require('async');
var path = require('path');
var fs  = require('fs');


exports = module.exports = auditPackage;
  
function auditPackage(cb) {

    var pkgPath = path.resolve(process.cwd(), 'package.json');
    var pkg;
    var registry;

    fs.exists(pkgPath, fileExists);

    function fileExists(exists) {
        if (!exists) {
            return cb(new Error('Can\'t load ' + pkgPath + '\nMake sure you have a package.json available'), null);
        }

        pkg = JSON.parse(fs.readFileSync(pkgPath));

        npmconf.load(npmConfLoaded);

        function npmConfLoaded(err, config) {
            registry = new RegClient(config);
            checkPackage(pkg, undefined, returnResults);
        }

        function returnResults(err, results) {
            if (err) {
                return cb(err, null);
            }
            cb(null, results);
        }
    }


    function checkPackage(pkginfo, results, callback) {
        results = results || [];

        async.forEach(Object.keys(pkginfo.dependencies), function (module, cb) {

            parents[module] = parents[module] || [];
            if (parents[module].indexOf(pkginfo.name) === -1) {
                parents[module].push(pkginfo.name);
            }

            registry.get(module, pkginfo.dependencies[module], function (er, data, raw, res) {
                if (data && data.versions) {
                    var ver = semver.maxSatisfying(Object.keys(data.versions), pkginfo.dependencies[module]);
                    validateModule(module, ver, function (err, result) {
                        if (err) {
                            return cb(err, null);
                        }

                        if (result) {
                            var d = {
                                dependencyOf: resolveParents(module),
                                module: module,
                                version: ver,
                                advisory: result[0]
                            };
                            results.push(d);
                        }
                        if (data && data.versions && data.versions[ver] && data.versions[ver].dependencies) {
                            checkPackage(data.versions[ver], results, function () {
                                cb();
                            });
                        } else {
                            cb();
                        }
                    });
                } else {
                    cb();
                }
            });
        }, function (err) {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Get package
    // Get versions
    // max satisfy
    // verify if it's vuln
    var parents = {};

    function resolveParents(module, current) {
        current = current || [];
        var parent = parents[module] && parents[module].length ? parents[module][0] : undefined;
        if (parent && parent !== pkg.name && current.indexOf(parent) === -1) {
            current.unshift(parent);
            return resolveParents(parent, current);
        }
        return current;
    }
}


