/* global angular */

angular.module('iotControl')
.controller('DashboardViewCtrl', 
    [
        '$state', '$firebaseObject', 'userSvc', 'accessTokenSvc', 'server', 'toast',
        function($state, $firebaseObject, userSvc, accessTokenSvc, server, toast) {
            "use strict";

            var vm = this;

            if(!userSvc.isLoggedIn()) {
                userSvc.showLogin('dashboard').then(
                    function() {
                        vm.email = userSvc.get('email');
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
            else {
                vm.email = userSvc.get('email');
            }

            vm.isNewUser = function() {
                return userSvc.get('firstName') === 'New User';
            };

            vm.saveInfo = function() {
                var userRef = new Firebase(server.uri + '/users/' + userSvc.get('uid'));
                var userObj = $firebaseObject(userRef);
                var changed = false;

                if (userObj.firstName !== vm.firstName) {
                    userObj.firstName = vm.firstName;
                    changed = true;
                }
                if (userObj.lastName !== vm.lastName) {
                    userObj.lastName = vm.lastName;
                    changed = true;
                }
                if (userObj.tokens) {
                    for (var prop in vm.tokens) {
                        if (vm.tokens.hasOwnProperty(prop)) {
                            accessTokenSvc.addToken(prop, vm.tokens[prop]);
                            if (userObj.tokens[prop] !== vm.tokens[prop]) {
                                userObj.tokens[prop] = vm.tokens[prop];
                                changed = true;
                            }
                        }
                    }
                }
                else {
                    userObj.tokens = vm.tokens;
                    changed = true;
                }

                if (changed) {
                    userObj.$save().then(function(ref) {
                        $state.go('home');
                        changed = false;
                    },
                    function(error) {
                        console.log(error);
                    });
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Nothing to save!')
                        .position(toast.position)
                        .hideDelay(toast.durationLong)
                    );
                }
            };

            vm.logout = function() {
                userSvc.logoutUser();
            };
        }
    ]
);