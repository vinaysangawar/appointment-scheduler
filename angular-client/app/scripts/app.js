'use strict';

// Entrypoint for angular application. Sets routes.
angular.module('apptScheduler', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'ScheduleController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })

        $urlRouterProvider.otherwise('/');
    })
;
