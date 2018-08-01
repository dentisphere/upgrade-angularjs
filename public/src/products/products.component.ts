import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './product.interface';

@Component({
    templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
    title = 'Products';
    products: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getProducts().subscribe(products => {
            this.products = products;
        });
    }
}
