/* global angular */

angular.module('iotControl')
.controller('DashboardViewCtrl', 
    [
        '$firebaseObject', 'userSvc', 'server',
        function($firebaseObject, userSvc, server) {
            "use strict";

            var vm = this;

            if(!userSvc.isLoggedIn()) {
                userSvc.showLogin();
            }

            vm.isNewUser = function() {
                return userSvc.get('firstName') === 'New User';
            };

            vm.saveInfo = function() {
                var userRef = new Firebase(server.uri + '/users/' + userSvc.get('uid'));
                var userObj = $firebaseObject(userRef);
                console.log(userObj);
                /*
                userObj.firstName = vm.firstName;
                userObj.lastName = vm.lastName;
                userObj.tokens = vm.tokens;
                userObj.$save().then(function(ref) {
                    console.log(ref);
                },
                function(error) {
                    console.log(error);
                });
                */
            };
        }
    ]
);