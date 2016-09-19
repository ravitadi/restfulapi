'use strict';

const url = require('url');
const request = require('request');
var serviceEndPoint = 'http://gmapi.azurewebsites.net';

function callGMService(path, body, cb) {
	body = body || {};
	body.responseType = 'JSON';
	serviceEndPoint = url.resolve(serviceEndPoint, path);
	var options = {
	  url: serviceEndPoint,
	  method: 'POST',
	  body: body,
	  json: true
	};
	request(options, (err, res, body) => {
		if (err) {
			cb(err);
			console.error(err);
		} else {
			cb(null, body);
		}
	});
}

module.exports = {
    callGMService: callGMService
};