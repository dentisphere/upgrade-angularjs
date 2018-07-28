export let customersComponent = {
    templateUrl: './customers/customers.html',
    bindings: {},
    controller,
};

controller.$inject = ['customerService'];
function controller(customerService: any) {
    let ctrl = this;
    ctrl.title = 'Customers';

    ctrl.$onInit = function() {
        customerService.getCustomers().then((data: any) => (ctrl.customers = data));
    };
}
