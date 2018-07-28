import * as _ from 'lodash';
import { CustomerService } from '../customers/customerService';

export let ordersComponent = {
    templateUrl: './orders/orders.html',
    bindings: {},
    controller,
};

controller.$inject = ['orderService', 'customerService', '$q'];
function controller(orderService: any, customerService: CustomerService, $q: any) {
    let ctrl = this;
    ctrl.title = 'Orders';

    ctrl.$onInit = function() {
        return $q
            .all([customerService.getCustomers(), orderService.getOrders()])
            .then(([customers, orders]: [any[], any[]]) => {
                ctrl.customers = customers;
                ctrl.orders = orders;
                ctrl.orders.forEach(function(order: any) {
                    var customer = _.find(ctrl.customers, function(customer) {
                        return order.customerId === customer.id;
                    });
                    order.customerName = customer.fullName;
                });
            });
    };
}
