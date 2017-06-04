describe('Controller: ScheduleController', function() {
  // load the controller's module
  beforeEach(module('apptScheduler'));

  var ScheduleController, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(
    inject(function(
      $controller,
      _$httpBackend_,
      $rootScope,
      scheduleFactory,
      timeslotFactory,
      ngDialog
    ) {
      // place here mocked dependencies
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET('http://localhost:3000/schedule').respond({
        '9:00am-10:00am': {},
        '10:00am-11:00am': {},
        '11:00am-12:00pm': {},
        '12:00pm-1:00pm': {},
        '1:00pm-2:00pm': {},
        '2:00pm-3:00pm': {},
        '3:00pm-4:00pm': {},
        '4:00pm-5:00pm': {}
      });

      scope = $rootScope.$new();
      ScheduleController = $controller('ScheduleController', {
        $scope: scope,
        scheduleFactory: scheduleFactory,
        timeslotFactory: timeslotFactory,
        ngDialog: ngDialog
      });
    })
  );

  it('should have an empty schedule when the component loads', function() {
    expect(scope.schedule).toEqual(Object({}));
  });

  it('should have no timeslot selected', function() {
    expect(scope.selectedTimeslot).toEqual('');
  });

  it('should have no appointment selected', function() {
    expect(scope.selectedAppointment).toEqual(Object({}));
  });

});
