/* global angular */

angular.module('iotControl')
.controller('ToolbarCtrl', 
    [
        '$mdSidenav', '$state',
        function($mdSidenav, $state) {
            "use strict";

            var vm = this;

            vm.isHome = function isHome() {
                return $state.is('home');
            };

            vm.showNav = function showNav() {
                $mdSidenav('services').toggle();
            };
        }
    ]
);