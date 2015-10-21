/* global angular */

angular.module('iotControl')
.controller('DashboardViewCtrl', 
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