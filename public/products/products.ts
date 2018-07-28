export let productsComponent = {
    templateUrl: './products/products.html',
    bindings: {},
    controller,
};

controller.$inject = ['productService'];
function controller(productService: any) {
    let ctrl = this;
    ctrl.title = 'Products';

    ctrl.$onInit = function() {
        productService.getProducts().then((products: any[]) => {
            ctrl.products = products;
        });
    };
}