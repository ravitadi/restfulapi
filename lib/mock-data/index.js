'use strict';

var vehicleInfo = {
    service: 'getVehicleInfo',
    status: '200',
    data: {
        vin: {
            type: 'String',
            value: '123123412412'
        },
        color: {
            type: 'String',
            value: 'Metallic Silver'
        },
        fourDoorSedan: {
            type: 'Boolean',
            value: 'True'
        },
        twoDoorCoupe: {
            type: 'Boolean',
            value: 'False'
        },
        driveTrain: {
            type: 'String',
            value: 'v8'
        }
    }
};

var securityInfo = {
    "service": "getSecurityStatus",
    "status": "200",
    "data": {
        "doors": {
            "type": "Array",
            "values": [
            {
                "location": {
                "type": "String",
                "value": "frontRight"
                },
                "locked": {
                "type": "Boolean",
                "value": "True"
                }
            },{
                "location": {
                "type": "String",
                "value": "frontLeft"
                },
                "locked": {
                "type": "Boolean",
                "value": "True"
                }
            }]
        }
    }
};

var energyInfo = {
    "service": "getEnergyService",
    "status": "200",
    "data": {
        "tankLevel": {
            "type": "Number",
            "value": "30"
        },
        "batteryLevel": {
            "type": "Number",
            "value": "95.5"
        }
    }
};

var actionEngine = {
    "service": "actionEngine",
    "status": "200",
    "actionResult": {
        "status": "EXECUTED"
    }
};

module.exports = {
    vehicleInfo: vehicleInfo,
    securityInfo: securityInfo,
    actionEngine: actionEngine,
    doorsInfo: securityInfo,
    energyInfo: energyInfo
};