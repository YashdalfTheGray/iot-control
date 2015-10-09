/* global angular */

angular.module('iotControl')
.controller('HomeViewCtrl',
    [
        '$state', '$mdDialog', 'accessTokenSvc',
        function($state, $mdDialog, accessTokenSvc) {
            "use strict";

            var vm = this;
            if (accessTokenSvc.count() === 0) {
                $state.go('add-token', { returnView: 'home' });
            }
        }
    ]
);