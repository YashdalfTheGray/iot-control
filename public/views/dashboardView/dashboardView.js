/* global angular */

angular.module('iotControl')
.controller('DashboardViewCtrl', 
    [
        '$state', '$firebaseObject', 'userSvc', 'accessTokenSvc', 'server', 'toastSvc',
        function($state, $firebaseObject, userSvc, accessTokenSvc, server, toastSvc) {
            "use strict";

            var vm = this;
            var userRef = new Firebase(server.uri + '/users/' + userSvc.get('uid'));
            
            vm.userObj = $firebaseObject(userRef);

            function initView() {
                vm.email = userSvc.get('email');
                vm.userObj.$loaded().then(
                    function(result) {
                        for (var prop in result.tokens) {
                            if (result.tokens.hasOwnProperty(prop)) {
                                accessTokenSvc.addToken(prop, result.tokens[prop]);
                            }
                        }
                        userSvc.set('firstName', result.firstName);
                        userSvc.set('lastName', result.lastName);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            };

            if(!userSvc.isLoggedIn()) {
                userSvc.showLogin('dashboard')
                .then(
                    function() {
                        vm.email = userSvc.get('email');
                        initView();
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
            else {
                initView();
            }

            vm.isNewUser = function() {
                return userSvc.get('firstName') === 'New User';
            };

            vm.doneEditing = function() {
                vm.userObj.$save().then(
                    function() {
                        for (var prop in vm.userObj) {
                            if (vm.userObj.hasOwnProperty(prop)) {
                                accessTokenSvc.addToken(prop, vm.userObj[prop]);
                            }
                        }
                        userSvc.set('firstName', vm.userObj.firstName);
                        userSvc.set('lastName', vm.userObj.lastName);
                        $state.go('home');
                    },
                    function(error) {
                        console.log(error);
                    }
                );
                
            };

            vm.logout = function() {
                accessTokenSvc.trashTokens();
                userSvc.logoutUser();
            };
        }
    ]
);