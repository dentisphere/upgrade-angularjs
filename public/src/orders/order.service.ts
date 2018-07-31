import { Injectable, Inject } from '@angular/core';
import { Order } from './order.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
    constructor(private $http: HttpClient) {}

    getOrders(): Promise<Order[]> {
        return this.$http.get<Order[]>('/api/orders').toPromise();
    }

    getOrder(id: number): Promise<Order> {
        return this.$http.get<Order>(`/api/orders/${id}`).toPromise();
    }

    getOrdersByCustomer(customerId: number): Promise<Order[]> {
        return this.$http.get<Order[]>(`/api/customers/${customerId}/orders`).toPromise();
    }

    postOrder(order: Order): Promise<Order> {
        return this.$http.post<Order>('/api/orders', order).toPromise();
    }
}
