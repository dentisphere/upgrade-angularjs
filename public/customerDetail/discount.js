(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './customerDetail/discount.html',
        bindings: {
            customerDiscount: '<',
        },
        controller,
    };

    function controller() {
        let ctrl = this;
    }

    angular.module('app').component('discount', componentOptions);
})();
