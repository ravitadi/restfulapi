'use strict';

const routes = require('express').Router();
const vechicleRoutes = require('./vehicles-routes');

/* This functions is so that i can save the id in the req.api. 
 * Much cleaner this way then later in routes to parse it via url
 */
routes.use('/vehicles/:id', (req, res, next) =>  {
    req.api = req.params;
    next();
});
routes.use('/vehicles/:id', vechicleRoutes);

routes.all('/', (req, res) => {
    res.status(200).json({ message: 'you have hit our api' });
});

module.exports = routes;