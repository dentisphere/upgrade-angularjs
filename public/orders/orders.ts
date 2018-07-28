import * as _ from 'lodash';

export let ordersComponent = {
    templateUrl: './orders/orders.html',
    bindings: {},
    controller,
};

controller.$inject = ['orderService', 'customerService'];
function controller(orderService: any, customerService: any) {
    let ctrl = this;
    ctrl.title = 'Orders';

    ctrl.$onInit = function() {
        ctrl.customers = customerService.getCustomers();
        ctrl.orders = orderService.getOrders();
        ctrl.orders.forEach(function(order: any) {
            var customer = _.find(ctrl.customers, function(customer) {
                return order.customerId === customer.id;
            });
            order.customerName = customer.fullName;
        });
    };
}
