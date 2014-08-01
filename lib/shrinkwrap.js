require('colors');
var fs = require('fs');
var path = require('path');
var request = require('request');
var table = require('text-table');
var color = require('cli-color');
var ansiTrim = require('cli-color/lib/trim');

var error = require('../lib/error');

exports = module.exports = shrinkwrap;
 
exports.usage =
function usage(name, args) {
    args.usage('nsp shrinkwrap');
};
 
function shrinkwrap(args) {
    var file = path.resolve(process.cwd(), 'npm-shrinkwrap.json');
    // Check if file exists
    fs.exists(file, function (exists) {
        if (!exists) {
            return error('Can\'t load ' + file + '\nMake sure you have run \'npm shrinkwrap\'');
        }
        fs.createReadStream(file).pipe(
            request({
                url: 'https://nodesecurity.io/validate/shrinkwrap',
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                json: true
            }, function (err, response, body) {
                if (err) {
                    error('Something broke: ' + err);
                }

                if (body && body.length > 0) {
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
                    body.forEach(function (module) {
                        h.push([module.module, module.version, module.advisory.patched_versions, module.dependencyOf.join(' > ')]);
                    });
                    var t = table(h, opts);
                    console.error(t);
                    process.exit(1);
                } else {
                    console.error(color.green('No vulnerable modules found'));
                    process.exit(0);
                }
            }));
    });
}
