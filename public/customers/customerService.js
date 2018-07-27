(function() {
    'use strict';

    //Sample data
    const customers = [
        {
            id: 1,
            fullName: 'Jim Smith',
            address1: '123 Main Street',
            address2: null,
            city: 'Orlando',
            state: 'FL',
            zip: '32819',
            getsDiscount: true,
            discount: {
                discountId: 1,
                discountPercent: 10,
                discountName: 'Employee',
            },
        },
        {
            id: 2,
            fullName: 'Sally Sparrow',
            address1: '456 Wallaby Way',
            address2: 'Apt 23',
            city: 'Orlando',
            state: 'FL',
            zip: '32802',
            getsDiscount: false,
            discount: null,
        },
        {
            id: 3,
            fullName: 'Bolokada Conde',
            address1: '255 McFarland Drive',
            address2: null,
            city: 'Portland',
            state: 'OR',
            zip: '97204',
            getsDiscount: true,
            discount: {
                discountId: 2,
                discountPercent: 5,
                discountName: 'Friends & Family',
            },
        },
    ];

    angular.module('app').service('customerService', [
        '$http',
        function($http) {
            function getCustomers() {
                return customers;
            }

            function getCustomer(id) {
                return customers.filter(function(c) {
                    return c.id === id;
                })[0];
            }

            function postCustomer(customerToSave) {
                // return $http.post('/api/customers', customer).then(function(data) {
                //     return data;
                // });
                let index = _.findIndex(customers, customer => customer.id == customerToSave.id);
                if (index >= 0) {
                    customers[index] = customerToSave;
                }
            }

            return {
                getCustomers: getCustomers,
                getCustomer: getCustomer,
                postCustomer: postCustomer,
            };
        },
    ]);
})();
