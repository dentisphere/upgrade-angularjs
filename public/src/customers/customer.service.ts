import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.interface';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) {}

    getCustomers(): Promise<Customer[]> {
        return this.http.get<Customer[]>('/api/customers').toPromise();
    }

    getCustomer(id: number): Promise<Customer> {
        return this.http.get<Customer>(`/api/customers/${id}`).toPromise();
    }

    postCustomer(customer: Customer): Promise<Customer> {
        return this.http.post<Customer>('/api/customers', customer).toPromise();
    }
}
