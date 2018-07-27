(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './productDetail/productDetail.html',
        bindings: {
            product: '<',
        },
        controller,
    };

    function controller() {
        let ctrl = this;
        ctrl.title = 'Product Detail';
    }

    angular.module('app').component('productDetail', componentOptions);
})();
