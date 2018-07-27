(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './customers/customers.html',
        bindings: {},
        controller,
    };

    controller.$inject = ['customerService'];
    function controller(customerService) {
        let ctrl = this;
        ctrl.title = 'Customers';

        ctrl.$onInit = function() {
            ctrl.customers = customerService.getCustomers();
        };
    }

    angular.module('app').component('customers', componentOptions);
})();
