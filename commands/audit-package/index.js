var celeri  = require('celeri');
var package = require('./../../lib/package');

celeri.option({
    command: 'package',
    description: 'audits your package.json against NSP db (same as audit-package)'
}, action);

celeri.option({
    command: 'audit-package',
    description: 'audits your package.json against NSP db'
}, action);


function action(data) {
    package(data);
}
