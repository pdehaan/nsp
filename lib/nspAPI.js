var request = require('request');

exports = module.exports;

exports.validateModule = function (module, version, cb) {
    var url = 'https://nodesecurity.io/validate/' + module + '/' + version;
    request({
        url: url,
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        json: true
    }, function (err, response, body) {
        if (err) {
            return cb(err, null);
        }
        if (body && body.length > 0) {
            return cb(null, body);
        }
        cb();
    });
};

exports.validateShrinkwrap = function (shrinkwrap, cb) {
    request({
        url: 'https://nodesecurity.io/validate/shrinkwrap',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        json: shrinkwrap
    }, function (err, response, body) {
        if (err) { return cb(err, null); }
        
        cb(null, body);
    });
};