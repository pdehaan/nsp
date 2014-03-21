var celeri = require('celeri');
var package = require('./../../lib/package');

celeri.option({
    command: 'audit-package',
    description: 'audits your package.json against NSP db'
}, action);


function action(data) {
    package(data);
}
