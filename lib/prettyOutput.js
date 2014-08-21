var table = require('text-table');
var color = require('cli-color');
var ansiTrim = require('cli-color/trim');

exports = module.exports = prettyOutput;

function prettyOutput(result) {
    if (result && result.length > 0) {
        // Pretty output
        var opts = {
            align: [ 'l', 'c', 'c', 'l' ],
            stringLength: function (s) {
                return ansiTrim(s).length;
            }
        };
        var h = [
            [
                color.underline('Name'),
                color.underline('Installed'),
                color.underline('Patched'),
                color.underline('Vulnerable Dependency')
            ]
        ];
 
        result.forEach(function (module) {
            h.push([
                module.module,
                module.version,
                module.advisory.patched_versions,
                module.dependencyOf.join(' > ')
            ]);
        });
        var t = table(h, opts);
        console.error(t);
        process.exit(1);
    } else {
        console.error(color.green('No vulnerable modules found'));
        process.exit(0);
    }
}