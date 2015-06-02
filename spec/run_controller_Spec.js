'use strict';

describe('enterRun', function() {
  beforeEach(module('runningStats'));

  var runController;
  var httpBackend;
  var scope;

  beforeEach(
    inject(function($injector, $controller, $rootScope) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
      scope = $rootScope.$new();
      httpBackend = $injector.get('$httpBackend');
      runController = $controller('RunController', {
         $scope : scope
      });
      scope.initializeState();

  }));

  it('addRun function adds a run', function() {
    expect(scope.runs.length).toEqual(0);
    expect(scope.newRunName).toEqual('');
    expect(scope.newRunDistance).toEqual(0);
    expect(scope.newRunHrs).toEqual(0);
    expect(scope.newRunMins).toEqual(0);
    expect(scope.newRunSec).toEqual(0);

    scope.newRunName = 'test run';
    scope.newRunDistance = 10;
    scope.newRunHrs = 1;
    scope.newRunMins = 30;
    scope.newRunSec = 47;
    httpBackend.expectPOST('/runningstats/myruns')
    .respond({message : 'Run Saved!'});
    scope.addRun();
    httpBackend.flush();
    console.log(scope.runs);
    expect(scope.runs[0].name).toEqual('test run');
    expect(scope.runs[0].distance).toEqual(10);
    expect(scope.runs[0].duration.hrs).toEqual(1);
    expect(scope.runs[0].duration.mins).toEqual(30);
    expect(scope.runs[0].duration.sec).toEqual(47);
  });

});
