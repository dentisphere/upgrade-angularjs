import * as _ from 'lodash';

export let orderDetailComponent = {
    templateUrl: './orderDetail/orderDetail.html',
    bindings: {
        order: '<',
    },
    controller,
};

controller.$inject = ['productService', 'customerService', '$q'];
function controller(productService: any, customerService: any, $q: any) {
    let ctrl = this;
    ctrl.title = 'Order Detail';

    ctrl.$onInit = function() {
        $q.all([productService.getProducts(), customerService.getCustomer(ctrl.order.customerId)]).then(
            ([products, customer]: [any[], any]) => {
                ctrl.customer = customer;
                ctrl.order.items.forEach(function(item: any) {
                    var product = _.find(products, function(product) {
                        return product.id === item.productId;
                    });
                    item.productName = product.name;
                    item.itemPrice = item.quantity * product.price;
                });
            },
        );
    };
}
