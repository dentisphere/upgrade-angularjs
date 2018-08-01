import * as _ from 'lodash';
import { CustomerService } from '../customers/customer.service';
import { OrderService } from './order.service';
import { OnInit, Component } from '@angular/core';
import { Customer } from '../customers/customer.interface';
import { Order } from './order.interface';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
    title = 'Orders';
    customers: Customer[];
    orders: Order[];

    constructor(private orderService: OrderService, private customerService: CustomerService) {}

    ngOnInit(): void {
        forkJoin([this.customerService.getCustomers(), this.orderService.getOrders()]).subscribe(res => {
            [this.customers, this.orders] = res;
            this.orders.forEach(order => {
                var customer = _.find(this.customers, customer => {
                    return order.customerId === customer.id;
                });
                order.customerName = customer.fullName;
            });
        });
    }
}
