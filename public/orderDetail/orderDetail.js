(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './orderDetail/orderDetail.html',
        bindings: {
            order: '<',
        },
        controller,
    };

    controller.$inject = ['productService', 'customerService'];
    function controller(productService, customerService) {
        let ctrl = this;
        ctrl.title = 'Order Detail';

        ctrl.$onInit = function() {
            var products = productService.getProducts();
            ctrl.customer = customerService.getCustomer(ctrl.order.customerId);
            ctrl.order.items.forEach(function(item) {
                var product = _.find(products, function(product) {
                    return product.id === item.productId;
                });
                item.productName = product.name;
                item.itemPrice = item.quantity * product.price;
            });
        };
    }

    angular.module('app').component('orderDetail', componentOptions);
})();
