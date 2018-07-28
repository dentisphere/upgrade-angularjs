import * as _ from 'lodash';

export class OrderService {
    public static $inject = ['$http'];

    constructor(private $http: any) {}

    getOrders(): Promise<any[]> {
        return this.$http.get('/api/orders').then((response: any) => response.data);
    }

    getOrder(id: number): Promise<any> {
        return this.$http.get(`/api/orders/${id}`).then((response: any) => response.data);
    }

    getOrdersByCustomer(customerId: number): Promise<any[]> {
        return this.$http.get(`/api/customers/${customerId}/orders`).then((response: any) => response.data);
    }

    postOrder(order: any): Promise<any> {
        return this.$http.post('/api/orders', order).then(function(data: any) {
            return data;
        });
    }
}
