(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './home/home.html',
        bindings: {},
        controller,
    };

    function controller() {
        let ctrl = this;

        ctrl.title = 'Awesome, Inc. Internal Ordering System';
    }

    angular.module('app').component('home', componentOptions);
})();
