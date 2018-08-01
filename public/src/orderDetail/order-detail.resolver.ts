import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Order } from '../orders/order.interface';
import { Observable } from 'rxjs';
import { OrderService } from '../orders/order.service';
import { tap, take } from 'rxjs/operators';

@Injectable()
export class OrderDetailResolver implements Resolve<Order> {
    constructor(private orderService: OrderService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order> {
        let id = Number(route.paramMap.get('id'));
        return this.orderService.getOrder(id).pipe(
            take(1),
            tap(order => {
                if (!order) {
                    this.router.navigate(['/orders']);
                }
            }),
        );
    }
}
