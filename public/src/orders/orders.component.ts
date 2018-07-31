import * as _ from 'lodash';
import { CustomerService } from '../customers/customer.service';
import { OrderService } from './order.service';
import { OnInit, Component } from '@angular/core';
import { Customer } from '../customers/customer.interface';
import { Order } from './order.interface';

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
    private title = 'Orders';
    private customers: Customer[];
    private orders: Order[];

    constructor(private orderService: OrderService, private customerService: CustomerService) {}

    async ngOnInit(): Promise<void> {
        [this.customers, this.orders] = await Promise.all([
            this.customerService.getCustomers(),
            this.orderService.getOrders(),
        ]);
        this.orders.forEach(order => {
            var customer = _.find(this.customers, customer => {
                return order.customerId === customer.id;
            });
            order.customerName = customer.fullName;
        });
    }
}
