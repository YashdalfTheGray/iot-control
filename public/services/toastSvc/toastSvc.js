/* global angular */

angular.module('iotControl')
.factory('toastSvc',
    [
        '$mdToast',
        function($mdToast) {
            "use strict";

            var svc = this;

            svc.DURATION_LONG = 3000;
            svc.DURATION_SHORT = 1000;
            svc.POSITION_TOP_RIGHT = 'top right';

            svc.show = function(message, duration, position) {
                var toastPosition = position || svc.POSITION_TOP_RIGHT;
                var toastDuration = duration || svc.DURATION_LONG;

                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position(toastPosition)
                    .hideDelay(toastDuration)
                );
            };

            return {
                DURATION_LONG: svc.DURATION_LONG,
                DURATION_SHORT: svc.DURATION_SHORT,
                show: svc.show
            };
        }
    ]
)