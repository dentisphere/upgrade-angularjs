import * as moment from 'moment';

export let customerDetailComponent = {
    templateUrl: './customerDetail/customerDetail.html',
    bindings: {
        customer: '<',
    },
    controller,
};

controller.$inject = ['addressService', 'orderService', 'customerService'];
function controller(addressService: any, orderService: any, customerService: any) {
    let ctrl = this;
    ctrl.title = 'Customer Detail';
    ctrl.discountTemplate = '../customerDetail/discount.html';
    ctrl.customer = this.customer;

    ctrl.$onInit = function() {
        ctrl.address = addressService.getFullAddress(ctrl.customer);
        ctrl.orders = orderService.getOrdersByCustomer(ctrl.customer.id);
        ctrl.orders.forEach(function(order: any) {
            order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
        });
    };

    ctrl.updateDiscount = function(selectedDiscount: any) {
        ctrl.customer.discount = selectedDiscount;
        customerService.postCustomer(ctrl.customer);
    };
}
