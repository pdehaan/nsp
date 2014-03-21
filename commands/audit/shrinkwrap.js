var celeri = require('celeri');
var shrinkwrap = require('./../../lib/shrinkwrap');

celeri.option({
    command: 'audit-shrinkwrap OR as',
    description: 'audits your `npm shrinkwrap` against NSP db'
}, action);


function action(data) {
    shrinkwrap(data);
}
