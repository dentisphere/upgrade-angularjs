import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.interface';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) {}

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>('/api/customers');
    }

    getCustomer(id: number): Observable<Customer> {
        return this.http.get<Customer>(`/api/customers/${id}`);
    }

    postCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>('/api/customers', customer);
    }
}
