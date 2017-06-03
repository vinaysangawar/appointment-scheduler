'use strict';

// This module returns an angular resource used for backend requests in the controller.
angular.module('apptScheduler')
.constant("baseURL", "http://localhost:3000/")
.factory('scheduleFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + 'schedule');

}])

.factory('timeslotFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + 'schedule/:timeslot', null, {
              'updateTimeslot': { method:'PUT' },
              'clearTimeslot': { method: 'DELETE' }
        });

}])
;
