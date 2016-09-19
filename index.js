'use strict';

const request = require('request');
const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // to parse post body
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// If any system error throw a error
app.use((err, req, res, next) => {
	// Capture the log 
	console.error(err.stack);
	res.status(500).json({error: "We lost one of our wheel, we are working on getting it back on. Please try again in some try."});
});

// Using express routes to easily map the routes
app.use('/', routes);

// For pages that don't exist throw a 404
app.use((req, res, next) => {
	res.status(404).send({ error: 'Api not found Not found' });
});

var server = app.listen(PORT, () => {
    console.log('Application Listening on port ' + PORT);
});

module.exports = server;
