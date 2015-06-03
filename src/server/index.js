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

app.get('/runningstats/myruns', function(req, res) {
  res.redirect('/index.html');
});

router.get('/runningstats/myruns/:name', jsonParser, function(req, res) {
  Run.findOne({name: req.params.name}, function(err, run) {
    if (err || run === null) {
      return res.statsu(404).json({message: 'Run Not Found'});
    } else {
      return res.status(200).json({message: 'Here Is Your Run!'});
    }
  });
});


router.post('/runningstats/myruns', jsonParser, function(req, res) {
  var run = new Run(req.body);
  console.log(run);
  run.save(function(err) {
    if (err) {
      return res.status(404).json({message: 'Could Not Add Run!'});
    } else {
      return res.status(200).json({message: 'Run Saved!'});
    }
    });
});

router.put('/runningstats/myruns/:name', jsonParser, function(req, res) {
  var updatedRun = new Run(req.body);
  Run.findOne({name: req.params.name}, function(err, run) {
    console.log(run);
    if (err || run === null) {
      return res.status(404).json({message: 'Run not found'});
    } else {
      run.name = updatedRun.name;
      run.distance = updatedRun.distance;
      run.duration.hrs = updatedRun.duration.hrs;
      run.duration.mins = updatedRun.duration.mins;
      run.duration.sec = updatedRun.duration.sec;
      run.save(function(err) {
        if (err) {
          return res.status(400).json({message: 'Run Could Not Be Updated'});
        } else {
          return res.status(200).json({message: 'Run Updated!'});
        }
      });
    }
  });
});

router.delete('/runningstats/myruns/:name', jsonParser, function(req, res) {
  console.log(req.params.name);
  Run.findOneAndRemove({name: req.params.name}, function(err, run) {
    console.log(run);
    if (err || run === null) {
      return res.status(404).json({message: 'Run not found'});
    } else {
      return res.status(200).json({message: 'Delete Successful!'});
    }
  });
});

app.use(router);


module.exports = app;




