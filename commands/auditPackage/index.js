var celeri = require('celeri');
var auditPackage = require('./../../lib/auditPackage');
var prettyOutput = require('./../../lib/prettyOutput');

// Command Description

celeri.option({
    command: 'package',
    description: 'audits your package.json against NSP db (same as audit-package)'
}, action);

celeri.option({
    command: 'audit-package',
    description: 'audits your package.json against NSP db'
}, action);

// Action

function action(data) {
    auditPackage(function (err, results) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        // print results
        prettyOutput(results);
    });
}

// Helpers
