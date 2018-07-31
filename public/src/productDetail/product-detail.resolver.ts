import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Product } from '../products/product.interface';
import { Observable } from 'rxjs';
import { ProductService } from '../products/product.service';

@Injectable()
export class ProductDetailResolver implements Resolve<Product> {
    constructor(private productService: ProductService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Product | Observable<Product> | Promise<Product> {
        const id = Number(route.paramMap.get('id'));
        return this.productService.getProduct(id).then(product => {
            if (product) {
                return product;
            } else {
                this.router.navigate(['/products']);
                return null;
            }
        });
    }
}
