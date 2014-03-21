require('./audit');
require('./hello');

// var fs    = require('fs');
// var async = require('async');

// var files    = fs.readdirSync(__dirname);
// var commands = files.filter(function (file) {
//     return file !== 'index.js';
// });

// module.exports = function (cb) {
//     async.each(commands, load, done);

//     function load(commandName) {
//         console.log('requiring: ' + commandName);
//         require('./' + commandName);
//     }

//     function done() {
//         cb();
//     }
// };