'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RunSchema = new Schema({
  date: {
    time: {type: Date, default: Date.getTime},
    day: {type: Date, default: Date.getDay},
    month: {type: Date, default: Date.getMonth},
    dayofmonth: {type: Date, default: Date.getDate},
    year: {type: Date, default: Date.getFullYear},
  },
  name: String,
  distance: Number,
  time: {
    hours: Number,
    minutes: Number,
    seconds: Number,
  },
});

module.exports = mongoose.model('Runs', RunSchema);
