'use strict';

var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Doing something');
  next();
});

router.get('/runningstats', function(req, res) {
  res.send('Welcome to Running Stats!');
});

module.exports = router;




