var celeri     = require('celeri');
var shrinkwrap = require('./../../lib/shrinkwrap');

celeri.option({
    command: 'shrinkwrap',
    description: 'audits your `npm shrinkwrap` against NSP db (same as audit-shrinkwrap)'
}, action);

celeri.option({
    command: 'audit-shrinkwrap',
    description: 'audits your `npm shrinkwrap` against NSP db'
}, action);


function action(data) {
    shrinkwrap(data);
}
