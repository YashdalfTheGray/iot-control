/* global angular */

angular.module('iotControl')
.controller('DashboardCtrl', 
    [
        'userSvc',
        function(userSvc) {
            "use strict";

            var vm = this;

            if(!userSvc.isLoggedIn()) {
                userSvc.showLogin();
            }
        }
    ]
);