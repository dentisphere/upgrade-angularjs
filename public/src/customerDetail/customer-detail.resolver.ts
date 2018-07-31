import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Customer } from '../customers/customer.interface';
import { Observable } from 'rxjs';
import { CustomerService } from '../customers/customer.service';

@Injectable()
export class CustomerDetailResolver implements Resolve<Customer> {
    constructor(private customerService: CustomerService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Customer | Observable<Customer> | Promise<Customer> {
        let id = Number(route.paramMap.get('id'));
        return this.customerService.getCustomer(id).then(customer => {
            if (customer) {
                return customer;
            } else {
                this.router.navigate(['/customers']);
                return null;
            }
        });
    }
}
