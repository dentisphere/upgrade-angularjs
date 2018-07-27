(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './orders/orders.html',
        bindings: {},
        controller,
    };

    controller.$inject = ['orderService', 'customerService'];
    function controller(orderService, customerService) {
        let ctrl = this;
        ctrl.title = 'Orders';

        ctrl.$onInit = function() {
            ctrl.customers = customerService.getCustomers();
            ctrl.orders = orderService.getOrders();
            ctrl.orders.forEach(function(order) {
                var customer = _.find(ctrl.customers, function(customer) {
                    return order.customerId === customer.id;
                });
                order.customerName = customer.fullName;
            });
        };
    }

    angular.module('app').component('orders', componentOptions);
})();
