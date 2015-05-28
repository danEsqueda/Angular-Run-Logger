'use strict';

var app = require('../index.js');
var chai = require('chai');
var expect = chai.expect;
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
});



