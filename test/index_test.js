'use strict';

var app = require('../src/server/index.js');
var chai = require('chai');
var expect = chai.expect;
var Run = require('../src/server/run');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var testRun = new Run({
  name: 'test run',
  distance: 3,
  duration: {
    hrs: 1,
    mins: 29,
    sec: 0,
  },
});


describe('api', function() {

  before(function(done) {
    Run.remove({}, function(err) {
      if (err) {
        return console.log(err);
      }
    });
    done();
  });


  it('should Post a new run to the runs database', function(done) {
    chai.request(app)
    .post('/runningstats/myruns')
    .send(testRun)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should GET a run from the runs database', function(done) {
    chai.request(app)
    .get('/runningstats/myruns/' + testRun.name)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('Here Is Your Run!');
      done();
    });
  });

  it('should Delete a run from the runs database', function(done) {
    chai.request(app)
    .delete('/runningstats/myruns/' + testRun.name)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('Delete Successful!');
      done();
    });
  });

});



