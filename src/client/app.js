var Run = require('./run');

angular.module('runningStats', [])
  .controller('RunController', ['$scope', '$http', function($scope, $http) {

    $scope.filteredRuns = [];
    $scope.runs = [];
    $scope.message = '';
    $scope.initializeState = function() {
      $scope.newRunName = '';
      $scope.newRunDistance = 0;
      $scope.newRunHrs = 0;
      $scope.newRunMins = 0;
      $scope.newRunSec = 0;
    };
    $scope.initializeState();

    $scope.findRun = function(key, value) {
      console.log($scope.runs);
      console.log(key);
      console.log(value);

      for (var i = 0; i < $scope.runs.length; i++) {
        if ($scope.runs[i][key] === value) {
          console.log(i);
          return i;
        }
      }
      return -1;
    };

    $scope.getRun = function() {
      var newRun = new Run($scope.newRunName, $scope.newRunDistance,
        $scope.newRunHrs, $scope.newRunMins, $scope.newRunSec);
      var index = $scope.findRun('name', newRun.name);

      $http.get('/runningstats/myruns/' + newRun.name)
      .success(function(data, status, headers, config) {

        $scope.message = data.message;
        $scope.filteredRuns.push(newRun);
        $scope.initializeState();
      })
      .error(function(data, status, headers, config) {
        $scope.message = data.message;
      });
    };

    $scope.addRun = function() {

      var newRun = new Run($scope.newRunName, $scope.newRunDistance,
        $scope.newRunHrs, $scope.newRunMins, $scope.newRunSec);

      $http.post('/runningstats/myruns', newRun)
      .success(function(data, status, headers, config) {
        $scope.message = data.message;
        $scope.runs.push(newRun);
        $scope.initializeState();
      })
      .error(function(data, status, headers, config) {
        $scope.message = data.message;
      });
      // TODO: make a post to web service with JSON object to create a new run
    };

    $scope.updateRun = function(name) {
      var newRun = new Run($scope.newRunName, $scope.newRunDistance,
        $scope.newRunHrs, $scope.newRunMins, $scope.newRunSec);
      var index = $scope.findRun('name', name);

      $http.put('/runningstats/myruns/' + name, newRun)
      .success(function(data, status, headers, config) {
        $scope.runs.splice(index, 1, newRun);
        $scope.initializeState();
        $scope.message = data.message;
      })
      .error(function(data, status, headers, config) {
        $scope.message = data.message;
      });
    };

    $scope.deleteRun = function() {
      var newRun = new Run($scope.newRunName, $scope.newRunDistance,
        $scope.newRunHrs, $scope.newRunMins, $scope.newRunSec);

      var index = $scope.findRun('name', newRun.name);

      $http.delete('/runningstats/myruns/' + newRun.name)
      .success(function(data, status, headers, config) {
        $scope.message = data.message;
        $scope.runs.splice(index, 1);
        $scope.initializeState();
      })
      .error(function(data, status, headers, config) {
        $scope.message = data.message;
      });
    };



  }, ]);
