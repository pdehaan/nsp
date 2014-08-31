var celeri = require('celeri');
var auditShrinkwrap = require('./../../lib/auditShrinkwrap');
var prettyOutput = require('./../../lib/prettyOutput');

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
        if (err) {
            console.error(err);
            process.exit(1);
        }

        prettyOutput(results);
    });
}

// Helpers
