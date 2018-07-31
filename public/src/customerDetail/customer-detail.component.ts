import * as moment from 'moment';
import { CustomerService } from '../customers/customer.service';
import { AddressService } from '../shared/address.service';
import { OrderService } from '../orders/order.service';
import { OnInit, Input, Component } from '@angular/core';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
})
export class CustomerDetailComponent implements OnInit {
    @Input() customer: any;
    private title: string;
    private discountTemplate: string;
    private address: any;
    private orders: any = [];

    constructor(
        private addressService: AddressService,
        private orderService: OrderService,
        private customerService: CustomerService,
    ) {}

    async ngOnInit(): Promise<void> {
        this.title = 'Customer Detail';
        this.discountTemplate = '../customerDetail/discount.html';
        this.address = this.addressService.getFullAddress(this.customer);
        this.orders = await this.orderService.getOrdersByCustomer(this.customer.id);
        this.orders.forEach(function(order: any) {
            order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
        });
    }

    updateDiscount($event: any): void {
        this.customer.discount = $event.selectedDiscount;
        this.customerService.postCustomer(this.customer);
    }
}
