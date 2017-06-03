'use strict';

angular.module('apptScheduler')

.controller('ScheduleController', ['$scope', 'scheduleFactory', 'timeslotFactory', 'ngDialog',
    function ($scope, scheduleFactory, timeslotFactory, ngDialog) {

    // Globals to keep track of current schedule, a selected timeslot and its appointment.
    $scope.schedule = {};
    $scope.selectedTimeslot = '';
    $scope.selectedAppointment = {};

    // Initialize the current state of the schedule from the backend.
    scheduleFactory.get().$promise.then(
        function (response) {
            $scope.schedule = response;

            // Attach isTimeslotTaken property to a timeslot incase backend already
            // has an appointment for a timeslot. Also used to load appropriate css.
            for (var timeslot in $scope.schedule) {
                if (JSON.stringify($scope.schedule[timeslot]) === '{}') {
                    $scope.schedule[timeslot].isTimeslotTaken = false;
                } else { $scope.schedule[timeslot].isTimeslotTaken = true; }
            }
            console.log('Current Schedule: ' + JSON.stringify($scope.schedule));
        },
        function (error) {
            $scope.message = "Error in fetching schedule: " + error.status + " " + error.statusText;
        }
    );

    // This helper method is used in constructing the pop up modal elements dynamically.
    $scope.isSelectedTimeslotTaken = function () {
        if ($scope.schedule[$scope.selectedTimeslot].isTimeslotTaken === true) {
            return true;
        } else return false;
    };

    // Function to load the pop up modal. Sets the selected timeslot and fetches the
    // latest appointment details, if any, for the selected timeslot.
    $scope.openAppointmentModal = function (timeslot) {
        $scope.selectedTimeslot = timeslot;

        $scope.selectedAppointment = timeslotFactory.get({
                timeslot: $scope.selectedTimeslot
            })
            .$promise.then(
                function (response) {
                    $scope.selectedAppointment = response;
                    console.log('Current Appointment Details: ' + JSON.stringify($scope.selectedAppointment));
                    ngDialog.open({ template: 'views/scheduleModal.html', scope: $scope, className: 'ngdialog-theme-default'});
                },
                function (error) {
                    console.log("Error fetching appointment details for selected timeslot: " + error.status + " " + error.statusText);
                }
            );
    };

    // Function to update the selected timeslot with an appointment. The name and
    // phone number fields for the selected appointment are data binded with the html.
    // We will use that data binded selectedAppointment object to update the timeslot.
    $scope.updateTimeslot = function () {
        timeslotFactory.updateTimeslot({
                timeslot: $scope.selectedTimeslot
            }, $scope.selectedAppointment)
            .$promise.then(
                function (response) {
                    console.log('Appointment updated as: ' + JSON.stringify(response));
                    $scope.schedule[$scope.selectedTimeslot].name = response.name;
                    $scope.schedule[$scope.selectedTimeslot].phoneNumber = response.phoneNumber;
                    $scope.schedule[$scope.selectedTimeslot].isTimeslotTaken = true;
                    console.log('Current Schedule: ' + JSON.stringify($scope.schedule));

                    // Reset selected timeslot and corresponding appointment and close dialog
                    $scope.selectedTimeslot = '';
                    $scope.selectedAppointment = {};
                    ngDialog.close();
                },
                function (error) {
                    console.log("Error in updating timeslot: " + error.status + " " + error.statusText);
                }
            );
    };

    // Function to clear the selected timeslot.
    $scope.clearSelectedAppointment = function () {
        timeslotFactory.clearTimeslot({
                timeslot: $scope.selectedTimeslot
            })
            .$promise.then(
                function (response) {
                    $scope.schedule[$scope.selectedTimeslot].isTimeslotTaken = false;
                    delete $scope.schedule[$scope.selectedTimeslot].name;
                    delete $scope.schedule[$scope.selectedTimeslot].phoneNumber;
                    console.log($scope.selectedTimeslot + ' has been cleared.');

                    // Reset selected timeslot and corresponding appointment and close dialog
                    $scope.selectedAppointment = {};
                    $scope.selectedTimeslot = '';
                    ngDialog.close();
                },
                function (error) {
                    console.log("Error in clearing timeslot: " + error.status + " " + error.statusText);
                }
            );
    };

}]);
