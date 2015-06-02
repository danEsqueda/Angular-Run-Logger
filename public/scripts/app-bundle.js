(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Run = require('./run');

angular.module('runningStats', [])
  .controller('RunController', ['$scope', '$http', function($scope, $http) {

      $scope.runs = [];
      $scope.initializeState = function() {
        $scope.newRunName = '';
        $scope.newRunDistance = 0;
        $scope.newRunHrs = 0;
        $scope.newRunMins = 0;
        $scope.newRunSec = 0;
      };
      $scope.initializeState();

      $scope.addRun = function() {

        var newRun = new Run($scope.newRunName, $scope.newRunDistance,
          $scope.newRunHrs, $scope.newRunMins, $scope.newRunSec);
        $scope.runs.push(newRun);
        $scope.initializeState();

        $http.post('runningstats/myruns', newRun)
        .success(function(data, status, headers, config) {
          $scope.postMessage = data.message;
        })
        .error(function(data, status, headers, config) {
          $scope.postMessage = 'Error Saving Run';
        });
        // TODO: make a post to web service with JSON object to create a new run
      };



  }]);

},{"./run":2}],2:[function(require,module,exports){
var Run = function(name, distance, hrs, mins, sec) {
  var run = {
    name: name,
    distance: distance,
    duration: {
      hrs: hrs,
      mins: mins,
      sec: sec
    },
  }
  return run;
};

module.exports = Run;

},{}]},{},[1,2]);
