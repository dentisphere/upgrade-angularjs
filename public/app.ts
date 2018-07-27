import * as angular from 'angular';
import 'angular-route';

import { homeComponent } from './home/home';

angular.module('app', ['ngRoute']);

angular.module('app').config([
    '$locationProvider',
    function($locationProvider: any) {
        $locationProvider.hashPrefix('');
    },
]);

angular.module('app').component('home', homeComponent);
