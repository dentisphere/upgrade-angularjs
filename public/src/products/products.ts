import { ProductService } from './product.service';

export let productsComponent: ng.IComponentOptions = {
    templateUrl: './products.html',
    bindings: {},
    controller,
};

controller.$inject = ['productService'];
function controller(productService: ProductService): void {
    let ctrl = this;
    ctrl.title = 'Products';

    ctrl.$onInit = async function() {
        ctrl.products = await productService.getProducts();
    };
}
