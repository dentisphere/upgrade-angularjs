import * as _ from 'lodash';
import { ProductService } from '../products/productService';
import { CustomerService } from '../customers/customerService';

export let orderDetailComponent = {
    templateUrl: './orderDetail/orderDetail.html',
    bindings: {
        order: '<',
    },
    controller,
};

controller.$inject = ['productService', 'customerService', '$q'];
function controller(productService: ProductService, customerService: CustomerService, $q: any) {
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
