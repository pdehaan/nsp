require('colors');
var fs = require('fs');
var path = require('path');
var request = require('request');
var log = require('npmlog');

var error = require('../lib/error');

exports = module.exports = shrinkwrap;
 
exports.usage =
function usage(name, args) {
    args.usage('nsp shrinkwrap');
};
 
function shrinkwrap(args) {
  //console.log('→ New issues'.green);
    var file = path.resolve(process.cwd(), 'npm-shrinkwrap.json');
    // Check if file exists
    fs.exists(file, function (exists) {
        if (!exists) {
            return error('Can\'t load ' + file + '\nMake sure you have run \'npm shrinkwrap\'');
        }    
        fs.createReadStream(file).pipe(
            request({
                url: 'https://nodesecurity.io/validate/shrinkwrap',
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                }
            }, function (err, response, body) {
                // review results
                console.log(body);
            }));
    });
}
