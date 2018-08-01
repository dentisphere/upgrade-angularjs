import * as moment from 'moment';
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AddressService } from '../shared/address.service';
import { Customer } from '../customers/customer.interface';
import { CustomerService } from '../customers/customer.service';
import { Order } from '../orders/order.interface';
import { OrderService } from '../orders/order.service';
import { SelectedDiscountEvent } from './discount.component';
import { map, tap, flatMap, first } from 'rxjs/operators';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
})
export class CustomerDetailComponent implements OnInit {
    customer: Customer;
    private title: string;
    private address: string;
    private orders: Order[] = [];

    constructor(
        private addressService: AddressService,
        private orderService: OrderService,
        private customerService: CustomerService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.title = 'Customer Detail';

        this.route.data
            .pipe(
                first(),
                map(data => data.customer),
                tap(customer => {
                    this.customer = customer;
                    this.address = this.addressService.getFullAddress(this.customer);
                }),
                flatMap(customer => this.orderService.getOrdersByCustomer(this.customer.id)),
                first(),
                tap(orders => {
                    this.orders = orders;
                    this.orders.forEach(order => {
                        order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
                    });
                }),
            )
            .subscribe();
    }

    updateDiscount($event: SelectedDiscountEvent): void {
        this.customer.discount = $event.selectedDiscount;
        this.customerService.postCustomer(this.customer).subscribe();
    }
}
