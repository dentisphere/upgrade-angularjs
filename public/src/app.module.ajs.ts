import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

import 'jquery';
import * as angular from 'angular';
import 'angular-route';

import { HomeComponent } from './home/home.component';
import { hashPrefixConfig } from './config.hashprefix';
import { routeConfig } from './config.routes';
import { AddressService } from './shared/address.service';
import { CustomerDetailComponent } from './customerDetail/customer-detail.component';
import { DiscountComponent } from './customerDetail/discount.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerService } from './customers/customer.service';
import { NavigationComponent } from './navigation/navigation.component';
import { OrderDetailComponent } from './orderDetail/order-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderService } from './orders/order.service';
import { ProductDetailComponent } from './productDetail/product-detail.component';
import { productsComponent } from './products/products';
import { ProductService } from './products/product.service';
import { AuthenticationService } from './shared/authentication.service';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';

const MODULE_NAME = 'app';
export default MODULE_NAME;

angular
    .module(MODULE_NAME, ['ngRoute'])
    .config(hashPrefixConfig)
    .config(routeConfig)
    .directive('home', downgradeComponent({ component: HomeComponent }))
    .directive('customerDetail', downgradeComponent({ component: CustomerDetailComponent }))
    .directive('discount', downgradeComponent({ component: DiscountComponent }))
    .directive('customers', downgradeComponent({ component: CustomersComponent }))
    .directive('navigation', downgradeComponent({ component: NavigationComponent }))
    .directive('orderDetail', downgradeComponent({ component: OrderDetailComponent }))
    .directive('orders', downgradeComponent({ component: OrdersComponent }))
    .directive('productDetail', downgradeComponent({ component: ProductDetailComponent }))
    .component('products', productsComponent)
    .factory('orderService', downgradeInjectable(OrderService))
    .factory('customerService', downgradeInjectable(CustomerService))
    .factory('productService', downgradeInjectable(ProductService))
    .factory('addressService', downgradeInjectable(AddressService))
    .factory('authenticationService', downgradeInjectable(AuthenticationService));
