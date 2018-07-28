import * as moment from 'moment';
import { CustomerService } from '../customers/customerService';

export let customerDetailComponent = {
    templateUrl: './customerDetail/customerDetail.html',
    bindings: {
        customer: '<',
    },
    controller,
};

controller.$inject = ['addressService', 'orderService', 'customerService'];
function controller(addressService: any, orderService: any, customerService: CustomerService) {
    let ctrl = this;
    ctrl.title = 'Customer Detail';
    ctrl.discountTemplate = '../customerDetail/discount.html';
    ctrl.customer = this.customer;

    ctrl.$onInit = function() {
        ctrl.address = addressService.getFullAddress(ctrl.customer);
        orderService.getOrdersByCustomer(ctrl.customer.id).then((orders: any) => {
            ctrl.orders = orders;
            ctrl.orders.forEach(function(order: any) {
                order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
            });
        });
    };

    ctrl.updateDiscount = function(selectedDiscount: any) {
        ctrl.customer.discount = selectedDiscount;
        return customerService.postCustomer(ctrl.customer);
    };
}
