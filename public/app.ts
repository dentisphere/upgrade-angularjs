import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

import 'jquery';
import * as angular from 'angular';
import 'angular-route';

import { homeComponent } from './home/home';
import { hashPrefixConfig } from './config.hashprefix';
import { routeConfig } from './config.routes';
import { AddressService } from './shared/addressService';
import { customerDetailComponent } from './customerDetail/customerDetail';
import { discountComponent } from './customerDetail/discount';
import { customersComponent } from './customers/customers';
import { CustomerService } from './customers/customerService';
import { navigationComponent } from './navigation/navigation';
import { orderDetailComponent } from './orderDetail/orderDetail';
import { ordersComponent } from './orders/orders';
import { OrderService } from './orders/orderService';
import { productDetailComponent } from './productDetail/productDetail';
import { productsComponent } from './products/products';
import { ProductService } from './products/productService';
import { AuthenticationService } from './shared/authenticationService';

angular
    .module('app', ['ngRoute'])
    .config(hashPrefixConfig)
    .config(routeConfig)
    .component('home', homeComponent)
    .component('customerDetail', customerDetailComponent)
    .component('discount', discountComponent)
    .component('customers', customersComponent)
    .component('navigation', navigationComponent)
    .component('orderDetail', orderDetailComponent)
    .component('orders', ordersComponent)
    .component('productDetail', productDetailComponent)
    .component('products', productsComponent)
    .service('orderService', OrderService)
    .service('customerService', CustomerService)
    .service('productService', ProductService)
    .service('addressService', AddressService)
    .service('authenticationService', AuthenticationService);
