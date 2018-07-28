import * as angular from 'angular';
import 'angular-route';

import { homeComponent } from './home/home';
import { hashPrefixConfig } from './config.hashprefix';
import { routeConfig } from './config.routes';
import { AddressService } from './shared/addressService';
import { customerDetailComponent } from './customerDetail/customerDetail';
import { discountComponent } from './customerDetail/discount';
import { customersComponent } from './customers/customers';

angular
    .module('app', ['ngRoute'])
    .config(hashPrefixConfig)
    .config(routeConfig)
    .component('home', homeComponent)
    .component('customerDetail', customerDetailComponent)
    .component('discount', discountComponent)
    .component('customers', customersComponent)
    .service('addressService', AddressService);
