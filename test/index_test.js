'use strict';

var app = require('../index.js');
var chai = require('chai');
var expect = chai.expect;
var Run = require('../run');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('api', function() {

  it('should respond with message at home page', function(done) {
    chai.request(app)
    .get('/runningstats')
    .set('Content-Type', 'text/plain')
    .send('Welcome to Running Stats!')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Welcome to Running Stats!');
      done();
    });
  });

  it('should Post a new run to the runs database', function(done) {
    var d = new Date();
    var testRun = new Run({
      date: {
        day: d.toDateString(),
        time: d.toTimeString(),
      },
      name: 'test run',
      distance: {
        dist: 3,
      },
      time: {
        hours: 0,
        minutes: 29,
        seconds: 0,
      },
    });
    chai.request(app)
    .post('/runningstats/myruns')
    .send(testRun)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

});



