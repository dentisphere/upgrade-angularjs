import { Injectable } from '@angular/core';
import { Customer } from '../customers/customer.interface';

@Injectable()
export class AddressService {
    getFullAddress(customer: Customer): string {
        return customer.address1 + ', ' + customer.city + ', ' + customer.state + ' ' + customer.zip;
    }
}
