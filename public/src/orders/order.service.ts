import { Injectable, Inject } from '@angular/core';
import { Order } from './order.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {
    constructor(private $http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.$http.get<Order[]>('/api/orders');
    }

    getOrder(id: number): Observable<Order> {
        return this.$http.get<Order>(`/api/orders/${id}`);
    }

    getOrdersByCustomer(customerId: number): Observable<Order[]> {
        return this.$http.get<Order[]>(`/api/customers/${customerId}/orders`);
    }

    postOrder(order: Order): Observable<Order> {
        return this.$http.post<Order>('/api/orders', order);
    }
}
