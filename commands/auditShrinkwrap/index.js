var celeri     = require('celeri');
var auditShrinkwrap = require('./../../lib/auditShrinkwrap');
var table = require('text-table');
var color = require('cli-color');
var ansiTrim = require('cli-color/lib/trim');

// Command Description

celeri.option({
    command: 'shrinkwrap',
    description: 'audits your `npm shrinkwrap` against NSP db (same as audit-shrinkwrap)'
}, action);

celeri.option({
    command: 'audit-shrinkwrap',
    description: 'audits your `npm shrinkwrap` against NSP db'
}, action);

// Action

function action(data) {
    auditShrinkwrap(function (err, results) {

        if (results && results.length > 0) {
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
            results.forEach(function (module) {
                h.push([module.module, module.version, module.advisory.patched_versions, module.dependencyOf.join(' > ')]);
            });
            var t = table(h, opts);
            console.error(t);
            process.exit(1);
        } else {
            console.error(color.green('No vulnerable modules found'));
            process.exit(0);
        }

    });
}

// Helpers
