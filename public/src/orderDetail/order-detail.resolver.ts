import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Order } from '../orders/order.interface';
import { Observable } from 'rxjs';
import { OrderService } from '../orders/order.service';

@Injectable()
export class OrderDetailResolver implements Resolve<Order> {
    constructor(private orderService: OrderService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Order | Observable<Order> | Promise<Order> {
        let id = Number(route.paramMap.get('id'));
        return this.orderService.getOrder(id).then(order => {
            if (order) {
                return order;
            } else {
                this.router.navigate(['/orders']);
                return null;
            }
        });
    }
}
