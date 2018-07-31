import { CustomerService } from './customers/customer.service';
import { ProductService } from './products/product.service';
import { OrderService } from './orders/order-service';

routeConfig.$inject = ['$routeProvider'];

export function routeConfig($routeProvider: ng.route.IRouteProvider): void {
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
                    async function($route: ng.route.IRouteService, customerService: CustomerService): Promise<any> {
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
                    async function($route: ng.route.IRouteService, orderService: OrderService): Promise<any> {
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
                    async function($route: ng.route.IRouteService, productService: ProductService): Promise<any> {
                        var id = parseInt($route.current.params.id);
                        return productService.getProduct(id);
                    },
                ],
            },
        });
}
