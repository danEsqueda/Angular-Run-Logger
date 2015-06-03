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

var testUpdateRun = new Run ({
  name: 'test run 2',
  distance: 4,
  duration: {
    hrs: 2,
    mins: 29,
    sec: 0,
  },
});

var testTwo = new Run ({
  name: 'test run 3',
  distance: 10,
  duration: {
    hrs: 1,
    mins: 25,
    sec: 25,
  },
});


describe('api', function() {

  before(function(done) {
    Run.remove({}, function(err) {
      if (err) {
        return console.log(err);
      }
    });
    testTwo.save(function(err) {
      if (err) {
        return console.log(err);
      }
    });
    done();
  });

  after(function(done) {
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

  it('should PUT to update an existing run', function(done) {
    chai.request(app)
    .put('/runningstats/myruns/test run 3')
    .send(testUpdateRun)
    .end(function(err, res) {
      expect(res.status).to.eql(200);
      expect(res.body.message).to.eql('Run Updated!');
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



