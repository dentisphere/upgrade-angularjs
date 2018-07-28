import * as _ from 'lodash';

export class OrderService {
    public static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {}

    getOrders(): ng.IPromise<any[]> {
        return this.$http.get<any[]>('/api/orders').then(response => response.data);
    }

    getOrder(id: number): ng.IPromise<any> {
        return this.$http.get<any>(`/api/orders/${id}`).then(response => response.data);
    }

    getOrdersByCustomer(customerId: number): ng.IPromise<any[]> {
        return this.$http.get<any[]>(`/api/customers/${customerId}/orders`).then(response => response.data);
    }

    postOrder(order: any): ng.IPromise<any> {
        return this.$http.post<any>('/api/orders', order);
    }
}
