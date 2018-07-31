import * as _ from 'lodash';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class OrderService {
    constructor(@Inject('$http') private $http: ng.IHttpService) {}

    async getOrders(): Promise<any[]> {
        const response = await this.$http.get<any[]>('/api/orders');
        return response.data;
    }

    async getOrder(id: number): Promise<any> {
        const response = await this.$http.get<any>(`/api/orders/${id}`);
        return response.data;
    }

    async getOrdersByCustomer(customerId: number): Promise<any[]> {
        const response = await this.$http.get<any[]>(`/api/customers/${customerId}/orders`);
        return response.data;
    }

    async postOrder(order: any): Promise<any> {
        const response = await this.$http.post<any>('/api/orders', order);
        return response.data;
    }
}
