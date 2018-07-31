import * as _ from 'lodash';
import { CustomerService } from '../customers/customer.service';
import { OrderService } from './order.service';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
    private title = 'Orders';
    private customers: any;
    private orders: any;

    constructor(private orderService: OrderService, private customerService: CustomerService) {}

    async ngOnInit(): Promise<void> {
        [this.customers, this.orders] = await Promise.all([
            this.customerService.getCustomers(),
            this.orderService.getOrders(),
        ]);
        this.orders.forEach((order: any) => {
            var customer = _.find(this.customers, customer => {
                return order.customerId === customer.id;
            });
            order.customerName = customer.fullName;
        });
    }
}
