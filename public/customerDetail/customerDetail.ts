import * as moment from 'moment';
import { CustomerService } from '../customers/customerService';
import { AddressService } from '../shared/addressService';
import { OrderService } from '../orders/orderService';

export let customerDetailComponent = {
    templateUrl: './customerDetail/customerDetail.html',
    bindings: {
        customer: '<',
    },
    controller,
};

controller.$inject = ['addressService', 'orderService', 'customerService'];
function controller(addressService: AddressService, orderService: OrderService, customerService: CustomerService) {
    let ctrl = this;
    ctrl.title = 'Customer Detail';
    ctrl.discountTemplate = '../customerDetail/discount.html';
    ctrl.customer = this.customer;

    ctrl.$onInit = function() {
        ctrl.address = addressService.getFullAddress(ctrl.customer);
        orderService.getOrdersByCustomer(ctrl.customer.id).then(orders => {
            ctrl.orders = orders;
            orders.forEach(function(order) {
                order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
            });
        });
    };

    ctrl.updateDiscount = function(selectedDiscount: any) {
        ctrl.customer.discount = selectedDiscount;
        return customerService.postCustomer(ctrl.customer);
    };
}
