'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var index = require('../');

chai.use(chaiHttp);

describe('Integration tests', function() {
    it('should list get all the info of car', function (done) {
        chai.request(index).get('/vehicles/1235')
        .end(function(err, res) {
            if (err) {
                console.log(err);
                done();
            } else {
            expect(res.status).to.equal(200);
            done();
            }
        });
    });
    it('should list get all the battery info of car', function (done) {
        chai.request(index).get('/vehicles/1235/battery')
        .end(function(err, res) {
            if (err) {
                console.log(err);
                done();
            } else {
            expect(res.status).to.equal(200);
            done();
            }
        });
    });
    it('should list get all the doors info of car', function (done) {
        chai.request(index).get('/vehicles/1235/doors')
        .end(function(err, res) {
            if (err) {
                console.log(err);
                done();
            } else {
            expect(res.status).to.equal(200);
            done();
            }
        });
    });
    it('should list get all the doors info of car', function (done) {
        chai.request(index).get('/vehicles/1235/doors')
        .end(function(err, res) {
            if (err) {
                console.log(err);
                done();
            } else {
            expect(res.status).to.equal(200);
            done();
            }
        });
    });
    it('should give you the results of hte action for car', function (done) {
        chai.request(index).post('/vehicles/1235/engine')
        .send({'action': 'START'})
        .end(function(err, res) {
            if (err) {
                console.log(err);
                done();
            } else {
            expect(res.status).to.equal(200);
            done();
            }
        });
    });
});