/* global angular */

angular.module('iotControl')
.controller('ToolbarCtrl', 
    [
        '$mdSidenav', '$state', 'userSvc',
        function($mdSidenav, $state, userSvc) {
            "use strict";

            var vm = this;

            vm.isHome = function() {
                return $state.is('home');
            };

            vm.showNav = function() {
                $mdSidenav('services').toggle();
            };

            vm.login = function() {
                userSvc.loginUser($state.current.name);
            };

            vm.showAccount = function() {
                console.log('Navigating to the user account page');
            }

            vm.user = userSvc;
        }
    ]
);