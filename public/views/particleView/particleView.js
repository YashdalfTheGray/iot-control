angular.module('iotControl')
.controller('ParticleViewCtrl',
    [
        '$state', '$mdToast', 'particleSvc', 'clearInputSvc',
        function($state, $mdToast, particleSvc, clearInputSvc) {
            "use strict";

            var vm = this;
            vm.devices = [];

            if(!particleSvc.hasToken()) {
                $state.go('add-token', { returnView: 'particle-view' });
            }
            else {
                particleSvc.getDevices().then(
                    function(result) {
                        _.forEach(result.data, function(device) {
                            particleSvc.getDeviceDetails(device.id).then(
                                function(result) {
                                    vm.devices.push(result.data);
                                },
                                function(error) {
                                    console.log(device.id + ' failed!');
                                    console.log(error);
                                }
                            )
                        });
                    },
                    function(error) {
                        console.log('Failed!');
                        console.log(error);
                    }
                );
            }

            vm.callFunction = function(deviceId, func, arg, idToClear) {
                if (arg) {
                    particleSvc.callFunction(deviceId, func, arg).then(
                        function(result) {
                            $mdToast.show(
                                $mdToast.simple()
                                .content('Function ' + func + ' executed successfully!')
                                .position('top right')
                                .hideDelay(3000)
                            );
                        },
                        function(error) {
                            console.log('Function ' + func + ' Failed!');
                            console.log(error);
                        }
                    );
                    clearInputSvc.clearInputBox(idToClear);
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Function argument required!')
                        .position('top right')
                        .hideDelay(3000)
                    );
                }
            }
        }
    ]
);