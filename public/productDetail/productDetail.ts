export let productDetailComponent: ng.IComponentOptions = {
    templateUrl: './productDetail/productDetail.html',
    bindings: {
        product: '<',
    },
    controller,
};

function controller(): void {
    let ctrl = this;
    ctrl.title = 'Product Detail';
}
