import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Product } from '../products/product.interface';
import { Observable } from 'rxjs';
import { ProductService } from '../products/product.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable()
export class ProductDetailResolver implements Resolve<Product> {
    constructor(private productService: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const id = Number(route.paramMap.get('id'));
        return this.productService.getProduct(id).pipe(
            take(1),
            tap(product => {
                if (!product) {
                    this.router.navigate(['/products']);
                }
            }),
        );
    }
}
