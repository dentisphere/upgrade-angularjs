(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './customerDetail/customerDetail.html',
        bindings: {
            customer: '<',
        },
        controller,
    };

    controller.$inject = ['addressService', 'orderService', 'customerService'];
    function controller(addressService, orderService) {
        let ctrl = this;
        ctrl.title = 'Customer Detail';
        ctrl.discountTemplate = '../customerDetail/discount.html';
        ctrl.customer = this.customer;

        ctrl.$onInit = function() {
            ctrl.address = addressService.getFullAddress(ctrl.customer);
            ctrl.orders = orderService.getOrdersByCustomer(ctrl.customer.id);
            ctrl.orders.forEach(function(order) {
                order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
            });
        };

        ctrl.updateDiscount = function(selectedDiscount) {
            ctrl.customer.discount = selectedDiscount;
            customerService.postCustomer(ctrl.customer);
        };
    }

    angular.module('app').component('customerDetail', componentOptions);
})();
