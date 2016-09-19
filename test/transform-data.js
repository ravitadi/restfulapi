'use strict';

var expect = require('chai').expect;
var transformData = require('../lib/transform-data');
var mockData = require('../lib/mock-data');

describe('Transform-data functions testing', function () {
    describe('testing getVehicleInfoService function', function () {
        it('should return the correct api format for Vehicle Info', function () {
            var response = transformData.getVehicleInfoService(mockData.vehicleInfo);
            expect(response).to.be.eql({
                    vin: '123123412412',
                    color: 'Metallic Silver',
                    doorCount: 4,
                    driveTrain: 'v8'
            });
        });
        it('should return empty object if no data is passed in', function () {
            expect(transformData.getVehicleInfoService()).to.be.empty;
        });
    });
    describe('testing postEngineAction function', function () {
        it('should return success object if the respone is executed', function () {
            expect(transformData.postEngineAction(mockData.actionEngine)).to.be.eql({
                status: 'success'
            });
        });
        it('should be error status if no data has been returns', function () {
            expect(transformData.postEngineAction()).to.be.eql({
                status: 'error'
            });
        });
    });
    describe('testing getDoorsInfo function', function () {
        it('should return list of objects for valid doors data', function () {
            var response = transformData.getDoorsInfo(mockData.doorsInfo);
            expect(response.length).to.equal(2);
            expect(response).to.be.eql(
            [{
                "location": "frontRight",
                "locked": true
            },
            {
                "location": "frontLeft",
                "locked": true
            }
            ]);
        });
        it('should be return empty array if no data has been passed', function () {
            expect(transformData.getDoorsInfo()).to.be.empty;
        });
    });
    describe('testing getFuelInfo function', function () {
        it('should return empty object if no data is passed in', function () {
            expect(transformData.getFuelInfo()).to.be.empty;
        });
        it('Should return the correct percent', function(){
            expect(transformData.getFuelInfo(mockData.energyInfo)).to.eql(
                {"percent": "30"}
            );
        });
    });
    describe('testing getBatteryInfo function', function () {
        it('Should return the correct percent', function(){
            expect(transformData.getBatteryInfo(mockData.energyInfo)).to.eql(
                {"percent": "95.5"}
            );
        });
        it('should return empty object if no data is passed in', function () {
            expect(transformData.getBatteryInfo()).to.be.empty;
        });
    });
});