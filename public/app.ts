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
    .service('customerService', CustomerService)
    .service('addressService', AddressService);
