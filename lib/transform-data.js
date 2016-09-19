'use strict';

const _ = require('lodash');

// Returns a list of doors with the property of location and if it is locked or not
function getDoorsInfo(input) {
    var doors = [];
    var doorsInfo = input && input.data && input.data.doors || {isEmpty: true}; 
    if (doorsInfo.isEmpty) {
        return doors;
    }
    if (doorsInfo.type === 'Array' && doorsInfo.values) {
        var allDoors = doorsInfo.values;
       for (var i = 0, len = allDoors.length; i < len; i++) {
           var doorProperty = {};
           var door = allDoors[i];
           doorProperty.location = _.get(door, 'location.value');
           doorProperty.locked = _.get(door, 'locked.value').toLowerCase() === 'true';
           doors.push(doorProperty);
        }
    }
    return doors; 
}

// return the nicely formatted VehicleInfoService
function getVehicleInfoService(input) {
    var data = input && input.data || {isEmpty: true}; 
    if (data.isEmpty) {
        return {};
    }
    var getDoorCount = function (data) {
        var count;
        var typeOfDoors = { fourDoorSedan: 4, twoDoorCoupe: 2 };
        Object.keys(typeOfDoors).some(function (key) {
            var isDoorExists = _.get(data, [key], false);  
            if (isDoorExists && isDoorExists.value && isDoorExists.type === 'Boolean' &&
                isDoorExists.value.toLowerCase() === 'true') {
                count = typeOfDoors[key];
                return true;
            }
        });
        return count;
    };
    return {
        vin: _.get(data, 'vin.value'),
        color: _.get(data, 'color.value'),
        doorCount: getDoorCount(data),
        driveTrain: _.get(data, 'driveTrain.value')
    };    
}

// Returns a percent of fuel
function getFuelInfo(input) {
   var fuelDetails = _.get(input, 'data.tankLevel', {isEmpty: true}); 
    if (fuelDetails.isEmpty) {
        return {};
    }
    // It is also if the service returns null, the clients needs to handle that error of falsy values
    return {
        percent: fuelDetails.value
    };
}

// Returns a percent of battery
function getBatteryInfo(input) {
    var batteryDetails = _.get(input, 'data.batteryLevel', {isEmpty: true}); 
    if (batteryDetails.isEmpty) {
        return {};
    }
    return {
        percent: batteryDetails.value
    };
}

// Returns a status of success or error depending on the service
function postEngineAction(input) {
    var engineAction = _.get(input, 'actionResult.status', {isEmpty: true});
    if (engineAction.isEmpty) {
        return {status: 'error'};
    }
    return {
        status: engineAction === 'EXECUTED' ? 'success' : 'error'
    };
}

module.exports = {
    getVehicleInfoService: getVehicleInfoService,
    getDoorsInfo: getDoorsInfo,
    getFuelInfo: getFuelInfo,
    getBatteryInfo: getBatteryInfo,
    postEngineAction: postEngineAction
};
