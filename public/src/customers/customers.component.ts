import { CustomerService } from './customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from './customer.interface';

@Component({
    templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
    title: string;
    customers: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit(): void {
        this.title = 'Customers';
        this.customerService.getCustomers().subscribe(customers => {
            this.customers = customers;
        });
    }
}
