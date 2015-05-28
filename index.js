'use strict';

var express = require('express');
var router = express.Router();
var Run = require('./run');
var app = express();

router.use(function(req, res, next) {
  console.log('Doing something');
  next();
});

router.get('/runningstats', function(req, res) {
  res.send('Welcome to Running Stats!');
});

// router.post('/runningstats/myruns', function(req, res) {

// });

app.use(router);

module.exports = app;




