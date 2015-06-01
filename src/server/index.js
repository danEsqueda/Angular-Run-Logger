'use strict';

var express = require('express');
var router = express.Router();
var Run = require('./run');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

mongoose.connect('mongodb://localhost:27017/runs');

router.use(function(req, res, next) {
  console.log('Doing something');
  next();
});

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

router.post('/runningstats/myruns', jsonParser, function(req, res) {
  var run = new Run(req.body);

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




