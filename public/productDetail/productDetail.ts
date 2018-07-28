export let productDetailComponent = {
    templateUrl: './productDetail/productDetail.html',
    bindings: {
        product: '<',
    },
    controller,
};

function controller() {
    let ctrl = this;
    ctrl.title = 'Product Detail';
}
