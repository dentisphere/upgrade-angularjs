import { Inject, Injectable } from '@angular/core';
import { Customer } from './customer.interface';

@Injectable()
export class CustomerService {
    constructor(@Inject('$http') private $http: ng.IHttpService) {}

    async getCustomers(): Promise<Customer[]> {
        const response = await this.$http.get<Customer[]>('/api/customers');
        return response.data;
    }

    async getCustomer(id: number): Promise<Customer> {
        const response = await this.$http.get<Customer>(`/api/customers/${id}`);
        return response.data;
    }

    async postCustomer(customer: Customer): Promise<Customer> {
        const response = await this.$http.post<Customer>('/api/customers', customer);
        return response.data;
    }
}
