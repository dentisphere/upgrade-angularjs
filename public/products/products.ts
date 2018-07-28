import { ProductService } from './productService';

export let productsComponent = {
    templateUrl: './products/products.html',
    bindings: {},
    controller,
};

controller.$inject = ['productService'];
function controller(productService: ProductService) {
    let ctrl = this;
    ctrl.title = 'Products';

    ctrl.$onInit = function() {
        productService.getProducts().then(products => {
            ctrl.products = products;
        });
    };
}
