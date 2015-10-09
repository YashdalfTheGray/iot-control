/* global angular */
/* global _ */

angular.module('iotControl', 
    [
        'ui.router',
        'ngAnimate',
        'ngMaterial',
        'firebase'
    ]
)
.config([
    '$urlRouterProvider', '$stateProvider', '$mdThemingProvider',
    function($urlRouterProvider, $stateProvider, $mdThemingProvider) {
        "use strict";

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/homeView/homeView.tpl.html',
            controller: 'HomeViewCtrl as ctrl'
        })
        .state('particle-view', {
            url: '/particle',
            templateUrl: 'views/particleView/particleView.tpl.html',
            controller: 'ParticleViewCtrl as ctrl'
        });
        $urlRouterProvider.otherwise('/');

        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('blue',{
                'default': 'A400',
                'hue-1': 'A700'
            })
            .warnPalette('red');
    }
]);