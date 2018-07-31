import * as _ from 'lodash';
import { CustomerService } from '../customers/customer.service';
import { OrderService } from './order.service';

export let ordersComponent: ng.IComponentOptions = {
    templateUrl: './orders.html',
    bindings: {},
    controller,
};

controller.$inject = ['orderService', 'customerService'];
function controller(orderService: OrderService, customerService: CustomerService) {
    let ctrl = this;
    ctrl.title = 'Orders';

    ctrl.$onInit = async function() {
        [ctrl.customers, ctrl.orders] = await Promise.all([customerService.getCustomers(), orderService.getOrders()]);
        ctrl.orders.forEach(function(order: any) {
            var customer = _.find(ctrl.customers, function(customer) {
                return order.customerId === customer.id;
            });
            order.customerName = customer.fullName;
        });
    };
}
