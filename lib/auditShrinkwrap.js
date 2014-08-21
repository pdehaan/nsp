var validateShrinkwrap = require('./nspAPI').validateShrinkwrap;
var path = require('path');
var fs = require('fs');

exports = module.exports = auditShrinkwrap;
 
function auditShrinkwrap(cb) {
    var shrinkwrapPath = path.resolve(process.cwd(), 'npm-shrinkwrap.json');
    // Check if shrinkwrap exists
    fs.exists(shrinkwrapPath, function (exists) {
        if (!exists) {
            return cb(new Error('Can\'t load ' + shrinkwrapPath + '\nMake sure you have run \'npm shrinkwrap\'', null));
        }

        var shrinkwrap = JSON.parse(fs.readFileSync(shrinkwrapPath));

        validateShrinkwrap(shrinkwrap, function (err, result) {
            if (err) {
                return cb(err, result);
            }
            cb(null, result);
        });
    });
}
