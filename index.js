'use strict';

var express = require('express');
var router = express.Router();
var Run = require('./run');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();



mongoose.connect('mongodb://localhost:27017/runs');

router.use(function(req, res, next) {
  console.log('Doing something');
  next();
});

router.get('/runningstats', function(req, res) {
  res.send('Welcome to Running Stats!');
});

router.post('/runningstats/myruns', jsonParser, function(req, res) {
  var run = new Run({
    date: {
      day: req.body.date.day,
      time: req.body.date.time,
    },
    name: req.body.name,
    distance: {
      dist: req.body.distance.dist,
    },
    time: {
      hours: req.body.time.hours,
      minutes: req.body.time.minutes,
      seconds: req.body.time.seconds,
    },
  });

  run.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send('Run saved!');
      }
    });
});

app.use(router);

module.exports = app;




