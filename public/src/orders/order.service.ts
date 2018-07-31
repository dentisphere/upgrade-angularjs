import * as _ from 'lodash';
import { Injectable, Inject } from '@angular/core';
import { Order } from './order.interface';

@Injectable()
export class OrderService {
    constructor(@Inject('$http') private $http: ng.IHttpService) {}

    async getOrders(): Promise<Order[]> {
        const response = await this.$http.get<Order[]>('/api/orders');
        return response.data;
    }

    async getOrder(id: number): Promise<Order> {
        const response = await this.$http.get<Order>(`/api/orders/${id}`);
        return response.data;
    }

    async getOrdersByCustomer(customerId: number): Promise<Order[]> {
        const response = await this.$http.get<Order[]>(`/api/customers/${customerId}/orders`);
        return response.data;
    }

    async postOrder(order: Order): Promise<Order> {
        const response = await this.$http.post<Order>('/api/orders', order);
        return response.data;
    }
}
