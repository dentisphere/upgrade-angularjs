import * as angular from 'angular';
import 'angular-route';

import { homeComponent } from './home/home';
import { hashPrefixConfig } from './config.hashprefix';
import { routeConfig } from './config.routes';
import { AddressService } from './shared/addressService';

angular
    .module('app', ['ngRoute'])
    .config(hashPrefixConfig)
    .config(routeConfig)
    .component('home', homeComponent)
    .service('addressService', AddressService);
