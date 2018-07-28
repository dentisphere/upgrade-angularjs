import * as _ from 'lodash';

export let orderDetailComponent = {
    templateUrl: './orderDetail/orderDetail.html',
    bindings: {
        order: '<',
    },
    controller,
};

controller.$inject = ['productService', 'customerService'];
function controller(productService: any, customerService: any) {
    let ctrl = this;
    ctrl.title = 'Order Detail';

    ctrl.$onInit = function() {
        var products = productService.getProducts();
        ctrl.customer = customerService.getCustomer(ctrl.order.customerId);
        ctrl.order.items.forEach(function(item: any) {
            var product = _.find(products, function(product) {
                return product.id === item.productId;
            });
            item.productName = product.name;
            item.itemPrice = item.quantity * product.price;
        });
    };
}
