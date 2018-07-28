import { CustomerService } from './customerService';

export let customersComponent: ng.IComponentOptions = {
    templateUrl: './customers.html',
    bindings: {},
    controller,
};

controller.$inject = ['customerService'];
function controller(customerService: CustomerService): void {
    let ctrl = this;
    ctrl.title = 'Customers';

    ctrl.$onInit = async function(): Promise<void> {
        ctrl.customers = await customerService.getCustomers();
    };
}
