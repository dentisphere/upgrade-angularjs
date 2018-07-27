(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './products/products.html',
        bindings: {},
        controller,
    };

    controller.$inject = ['productService'];
    function controller(productService) {
        let ctrl = this;
        ctrl.title = 'Products';

        ctrl.$onInit = function() {
            ctrl.products = productService.getProducts();
        };
    }

    angular.module('app').component('products', componentOptions);
})();
