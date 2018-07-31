import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

import 'jquery';
import * as angular from 'angular';
import 'angular-route';

import { HomeComponent } from './home/home.component';
import { hashPrefixConfig } from './config.hashprefix';
import { routeConfig } from './config.routes';
import { AddressService } from './shared/addressService';
import { customerDetailComponent } from './customerDetail/customerDetail';
import { discountComponent } from './customerDetail/discount';
import { customersComponent } from './customers/customers';
import { CustomerService } from './customers/customerService';
import { NavigationComponent } from './navigation/navigation.component';
import { orderDetailComponent } from './orderDetail/orderDetail';
import { ordersComponent } from './orders/orders';
import { OrderService } from './orders/orderService';
import { productDetailComponent } from './productDetail/productDetail';
import { productsComponent } from './products/products';
import { ProductService } from './products/productService';
import { AuthenticationService } from './shared/authenticationService';
import { downgradeComponent } from '@angular/upgrade/static';

const MODULE_NAME = 'app';
export default MODULE_NAME;

angular
    .module(MODULE_NAME, ['ngRoute'])
    .config(hashPrefixConfig)
    .config(routeConfig)
    .directive('home', downgradeComponent({ component: HomeComponent }))
    .component('customerDetail', customerDetailComponent)
    .component('discount', discountComponent)
    .component('customers', customersComponent)
    .directive('navigation', downgradeComponent({ component: NavigationComponent }))
    .component('orderDetail', orderDetailComponent)
    .component('orders', ordersComponent)
    .component('productDetail', productDetailComponent)
    .component('products', productsComponent)
    .service('orderService', OrderService)
    .service('customerService', CustomerService)
    .service('productService', ProductService)
    .service('addressService', AddressService)
    .service('authenticationService', AuthenticationService);
