'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RunSchema = new Schema({
  date: {
    day: String,
    time: String,
  },
  name: String,
  distance: {
    unit: {type: String, default: 'miles'},
    dist: Number,
  },
  duration: {
    hours: Number,
    minutes: Number,
    seconds: Number,
  },
});

module.exports = mongoose.model('Runs', RunSchema);
