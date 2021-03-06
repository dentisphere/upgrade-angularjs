import * as _ from 'lodash';
import { ProductService } from '../products/product.service';
import { CustomerService } from '../customers/customer.service';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../orders/order.interface';
import { Customer } from '../customers/customer.interface';
import { Product } from '../products/product.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'order-detail',
    templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
    order: Order;
    title = 'Order Detail';
    customer: Customer;

    constructor(
        private productService: ProductService,
        private customerService: CustomerService,
        private route: ActivatedRoute,
    ) {}

    async ngOnInit(): Promise<void> {
        let products: Product[];

        this.route.data.subscribe(async data => {
            this.order = data.order;
            [products, this.customer] = await Promise.all([
                this.productService.getProducts(),
                this.customerService.getCustomer(this.order.customerId),
            ]);

            this.order.items.forEach(item => {
                var product = _.find(products, product => {
                    return product.id === item.productId;
                });
                item.productName = product.name;
                item.itemPrice = item.quantity * product.price;
            });
        });
    }
}
