import * as _ from 'lodash';

export class OrderService {
    public static $inject = ['$http'];

    constructor(private $http: any) {}

    getOrders() {
        return orders();
    }

    getOrder(id: number) {
        return _.find(orders(), function(o) {
            return o.id === id;
        });
    }

    getOrdersByCustomer(customerId: number) {
        return orders().filter(function(o) {
            return o.customerId === customerId;
        });
    }

    postOrder(order: any) {
        return this.$http.post('/api/orders', order).then(function(data: any) {
            return data;
        });
    }
}

//Sample data
function orders() {
    return [
        {
            id: 1,
            orderDate: '2017-06-25T00:30:43.16-07:00',
            customerId: 2,
            totalCost: 15.0,
            totalSale: 15.0,
            totalItems: 3,
            items: [
                {
                    quantity: 2,
                    productId: 1,
                },
                {
                    quantity: 1,
                    productId: 4,
                },
            ],
        },
        {
            id: 2,
            orderDate: '2017-06-29T00:30:43.16-07:00',
            customerId: 1,
            totalCost: 10,
            totalSale: 9,
            totalItems: 4,
            items: [
                {
                    quantity: 2,
                    productId: 2,
                },
                {
                    quantity: 2,
                    productId: 3,
                },
            ],
        },
        {
            id: 3,
            orderDate: '2017-07-04T00:30:43.16-07:00',
            customerId: 3,
            totalCost: 5,
            totalSale: 4.75,
            totalItems: 2,
            items: [
                {
                    quantity: 2,
                    productId: 1,
                },
            ],
        },
        {
            id: 4,
            orderDate: '2017-08-04T00:30:43.16-07:00',
            customerId: 2,
            totalCost: 25,
            totalSale: 25,
            totalItems: 10,
            items: [
                {
                    quantity: 10,
                    productId: 2,
                },
            ],
        },
    ];
}
