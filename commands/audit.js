var shrinkwrap = require('../lib/shrinkwrap');
var package = require('../lib/package');
var error = require('../lib/error');

exports = module.exports = audit;
 
exports.usage = function usage(name, args) {
    args.usage('nsp audit <shrinkwrap|package>');
};

function audit(args) {
    if (args._[0] === 'shrinkwrap') {
        return shrinkwrap(args);
    }

    if (args._[0] === 'package') {
        return package(args);
    }

    console.log('nsp audit <shrinkwrap|package>');
    process.exit(1);
}
 
