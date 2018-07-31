import * as _ from 'lodash';
import { ProductService } from '../products/product.service';
import { CustomerService } from '../customers/customer.service';

export let orderDetailComponent: ng.IComponentOptions = {
    templateUrl: './orderDetail.html',
    bindings: {
        order: '<',
    },
    controller,
};

controller.$inject = ['productService', 'customerService'];
function controller(productService: ProductService, customerService: CustomerService) {
    let ctrl = this;
    ctrl.title = 'Order Detail';

    ctrl.$onInit = async function() {
        let products: any[];

        [products, ctrl.customer] = await Promise.all([
            productService.getProducts(),
            customerService.getCustomer(ctrl.order.customerId),
        ]);

        ctrl.order.items.forEach((item: any) => {
            var product = _.find(products, product => {
                return product.id === item.productId;
            });
            item.productName = product.name;
            item.itemPrice = item.quantity * product.price;
        });
    };
}
