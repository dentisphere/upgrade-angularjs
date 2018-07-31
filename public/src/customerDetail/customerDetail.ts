import * as moment from 'moment';
import { CustomerService } from '../customers/customer.service';
import { AddressService } from '../shared/address.service';
import { OrderService } from '../orders/order-service';

export let customerDetailComponent: ng.IComponentOptions = {
    templateUrl: './customerDetail.html',
    bindings: {
        customer: '<',
    },
    controller,
};

controller.$inject = ['addressService', 'orderService', 'customerService'];
function controller(
    addressService: AddressService,
    orderService: OrderService,
    customerService: CustomerService,
): void {
    let ctrl = this;
    ctrl.title = 'Customer Detail';
    ctrl.discountTemplate = '../customerDetail/discount.html';
    ctrl.customer = this.customer;

    ctrl.$onInit = async function(): Promise<void> {
        ctrl.address = addressService.getFullAddress(ctrl.customer);
        ctrl.orders = await orderService.getOrdersByCustomer(ctrl.customer.id);
        ctrl.orders.forEach(function(order: any) {
            order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
        });
    };

    ctrl.updateDiscount = function($event: any): void {
        ctrl.customer.discount = $event.selectedDiscount;
        customerService.postCustomer(ctrl.customer);
    };
}
