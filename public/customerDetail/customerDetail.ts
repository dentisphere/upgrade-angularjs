import * as moment from 'moment';
import { CustomerService } from '../customers/customerService';
import { AddressService } from '../shared/addressService';
import { OrderService } from '../orders/orderService';

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

    ctrl.updateDiscount = function(selectedDiscount: any): void {
        ctrl.customer.discount = selectedDiscount;
        customerService.postCustomer(ctrl.customer);
    };
}
