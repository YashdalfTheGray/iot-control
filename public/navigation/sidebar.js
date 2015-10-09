/* global angular */

angular.module('iotControl')
.controller('SidebarCtrl', 
    [
        '$mdSidenav', '$state',
        function($mdSidenav, $state) {
            "use strict";
            
            var vm = this;

            vm.goTo = function goToState(state) {
                $state.go(state);
                if(!$mdSidenav('services').isLockedOpen()) {
                    $mdSidenav('services').close();
                }
            };

            vm.services = [
                { name: 'Particle', state: 'particle-view' }
            ];
        }
    ]
)