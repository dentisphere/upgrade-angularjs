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

    async ngOnInit(): Promise<void> {
        this.title = 'Customers';
        this.customers = await this.customerService.getCustomers();
    }
}
