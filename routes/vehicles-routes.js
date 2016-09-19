'use strict';

const router = require('express').Router();
const serviceClient = require('../lib/service-client');
const transformUtils = require('../lib/transform-data');

function handleResponse(err, data, cb, res) {
    if (err) {
        // use logging
        console.error(err);
        res.status(500).json({message: 'woooosh, need to replace oil, we will service it and get back to you'});
    }
    if (!data) {
        res.status(200).json({message: 'There is no information avalible for this car and id your have provided me'});
    }
    if (data && data.status === '404') {
        res.status(404).json({message: data.reason || 'I couldn\'t find this car id in our system'});
    }
    res.status(200).json(cb(data));
}

// Vechicle info	needs to return
router.get('/', (req, res) => {
    serviceClient.callGMService('getVehicleInfoService', req.api, function (err, responseFromGmService) {
        handleResponse(err, responseFromGmService, transformUtils.getVehicleInfoService, res);
    });
})
    .get('/doors', (req, res) => {
        serviceClient.callGMService('getSecurityStatusService', req.api, function (err, responseFromGmService) {
            handleResponse(err, responseFromGmService, transformUtils.getDoorsInfo, res);
        });
    })
    .get('/fuel', (req, res) => {
        serviceClient.callGMService('getEnergyService', req.api, function (err, responseFromGmService) {
            handleResponse(err, responseFromGmService, transformUtils.getFuelInfo, res);
        });
    })
    // Battery
    .get('/battery', (req, res) => {
        serviceClient.callGMService('getEnergyService', req.api, function (err, responseFromGmService) {
            handleResponse(err, responseFromGmService, transformUtils.getBatteryInfo, res);
        });
    })
    // Start and Stop Engine api
    .post('/engine', (req, res) => {
        // Action can be "START|STOP"
        var actionMappings = {START: 'START_VEHICLE', STOP: 'STOP_VEHICLE'};
        var action = req.body && req.body.action;
        req.api.command = actionMappings[action.toUpperCase()]; 
        serviceClient.callGMService('actionEngineService', req.api, function (err, responseFromGmService) {
            handleResponse(err, responseFromGmService, transformUtils.postEngineAction, res);
        });
    })
    .all('/', (req, res) => {
        res.status(404).json('{error: "This route and/or this method is an invalid choice."}');
    });

module.exports = router;