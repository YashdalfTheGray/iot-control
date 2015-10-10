/* global angular */

angular.module('iotControl')
.controller('AddTokensViewCtrl',
    [
        '$state', '$stateParams', 'accessTokenSvc',
        function($state, $stateParams, accessTokenSvc) {
            "use strict";

            var vm = this;
            vm.askFor = $stateParams.askFor;

            vm.saveTokens = function() {
                if (vm.particleToken) {
                    accessTokenSvc.addToken('particle', vm.particleToken);
                    $state.go($stateParams.returnView);
                }
            };
        }
    ]
);