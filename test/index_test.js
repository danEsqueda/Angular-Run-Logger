'use strict';

var app = require('../src/server/index.js');
var chai = require('chai');
var expect = chai.expect;
var Run = require('../src/server/run');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('api', function() {

  beforeEach(function(done) {
    Run.remove({}, function(err) {
      if (err) {
        return console.log(err);
      }
    });
    done();
  });

  it('should Post a new run to the runs database', function(done) {
    var d = new Date();
    var testRun = new Run({
      name: 'test run',
      distance: 3,
      duration: {
        hrs: 1,
        mins: 29,
        sec: 0,
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



