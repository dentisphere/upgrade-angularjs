import { CustomerService } from './customers/customerService';
import { ProductService } from './products/productService';
import { OrderService } from './orders/orderService';

routeConfig.$inject = ['$routeProvider'];

export function routeConfig($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .when('/', {
            template: '<home></home>',
        })
        .when('/customers', {
            template: '<customers></customers>',
        })
        .when('/orders', {
            template: '<orders></orders>',
        })
        .when('/products', {
            template: '<products></products>',
        })
        .when('/customers/:id', {
            template: '<customer-detail customer="$resolve.customer"></customer-detail>',
            resolve: {
                customer: [
                    '$route',
                    'customerService',
                    function($route: ng.route.IRouteService, customerService: CustomerService) {
                        var id = parseInt($route.current.params.id);
                        return customerService.getCustomer(id);
                    },
                ],
            },
        })
        .when('/orders/:id', {
            template: '<order-detail order="$resolve.order"></order-detail>',
            resolve: {
                order: [
                    '$route',
                    'orderService',
                    function($route: ng.route.IRouteService, orderService: OrderService) {
                        var id = parseInt($route.current.params.id);
                        return orderService.getOrder(id);
                    },
                ],
            },
        })
        .when('/products/:id', {
            template: '<product-detail product="$resolve.product"></product-detail>',
            resolve: {
                product: [
                    '$route',
                    'productService',
                    function($route: ng.route.IRouteService, productService: ProductService) {
                        var id = parseInt($route.current.params.id);
                        return productService.getProduct(id);
                    },
                ],
            },
        });
}
