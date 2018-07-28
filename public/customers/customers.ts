import { CustomerService } from './customerService';

export let customersComponent = {
    templateUrl: './customers/customers.html',
    bindings: {},
    controller,
};

controller.$inject = ['customerService'];
function controller(customerService: CustomerService) {
    let ctrl = this;
    ctrl.title = 'Customers';

    ctrl.$onInit = function() {
        customerService.getCustomers().then(data => (ctrl.customers = data));
    };
}
