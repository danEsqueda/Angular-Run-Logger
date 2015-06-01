'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RunSchema = new Schema({
  name: String,
  distance: Number,
  duration: {
    hrs: Number,
    mins: Number,
    sec: Number,
  },
});

module.exports = mongoose.model('Runs', RunSchema);
