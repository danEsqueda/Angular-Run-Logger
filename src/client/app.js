var Run = require('./run');

angular.module('runningStats', [])
  .controller('enterRun', ['$scope', '$http', function($scope, $http) {

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
          console.log('success!!');
        })
        .error(function(data, status, headers, config) {
          console.error('failure');
        });
        // TODO: make a post to web service with JSON object to create a new run
      };



  }]);
