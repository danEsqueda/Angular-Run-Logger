'use strict';

describe('enterRun', function() {
  beforeEach(module('runningStats'));

  var runController;
  var httpBackend;
  var scope;
  var setNewRun = function() {
    scope.newRunName = 'test run';
    scope.newRunDistance = 10;
    scope.newRunHrs = 1;
    scope.newRunMins = 30;
    scope.newRunSec = 47;
  };

  beforeEach(
    inject(function($injector, $controller, $rootScope) {
      // The injector unwraps the underscores (_) from around
      // the parameter names when matching
      scope = $rootScope.$new();
      httpBackend = $injector.get('$httpBackend');
      runController = $controller('RunController', {
        $scope: scope,
      });


    })
  );

  it('addRun function adds a run', function() {
    scope.initializeState();
    expect(scope.runs.length).toEqual(0);
    expect(scope.newRunName).toEqual('');
    expect(scope.newRunDistance).toEqual(0);
    expect(scope.newRunHrs).toEqual(0);
    expect(scope.newRunMins).toEqual(0);
    expect(scope.newRunSec).toEqual(0);
    setNewRun();
    httpBackend.expectPOST('/runningstats/myruns')
    .respond({message: 'Run Saved!'});
    scope.addRun();
    httpBackend.flush();
    expect(scope.runs[0].name).toEqual('test run');
    expect(scope.runs[0].distance).toEqual(10);
    expect(scope.runs[0].duration.hrs).toEqual(1);
    expect(scope.runs[0].duration.mins).toEqual(30);
    expect(scope.runs[0].duration.sec).toEqual(47);
  });

  it('deleteRun function deletes a run', function() {
    setNewRun();
    httpBackend.expectDELETE('/runningstats/myruns/' + scope.newRunName)
    .respond({message: 'Delete Successful!'})
    scope.deleteRun();
    httpBackend.flush();
    expect(scope.runs.length).toEqual(0);
    expect(scope.message).toEqual('200 Delete Successful!');
  });

});
