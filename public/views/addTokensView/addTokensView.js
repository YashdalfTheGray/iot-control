/* global angular */

angular.module('iotControl')
.controller('AddTokensViewCtrl',
    [
        '$state', '$stateParams', 'accessTokenSvc', 'userSvc',
        function($state, $stateParams, accessTokenSvc, userSvc) {
            "use strict";

            var vm = this;
            vm.askFor = $stateParams.askFor;

            vm.saveTokens = function() {
                if (vm.particleToken) {
                    accessTokenSvc.addToken('particle', vm.particleToken);
                    $state.go($stateParams.returnView);
                }
            };

            vm.login = function() {
                userSvc.showLogin($stateParams.returnView);
            };
        }
    ]
);