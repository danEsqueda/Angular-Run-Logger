'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = require('./index');

app.use(router);

app.listen(port, function() {
  console.log('Listening on port: ' + port);
});
