import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Customer } from '../customers/customer.interface';
import { Observable } from 'rxjs';
import { CustomerService } from '../customers/customer.service';
import { tap, take } from 'rxjs/operators';

@Injectable()
export class CustomerDetailResolver implements Resolve<Customer> {
    constructor(private customerService: CustomerService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
        let id = Number(route.paramMap.get('id'));
        return this.customerService.getCustomer(id).pipe(
            take(1),
            tap(customer => {
                if (!customer) {
                    this.router.navigate(['/customers']);
                }
            }),
        );
    }
}
