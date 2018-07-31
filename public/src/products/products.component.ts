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

    async ngOnInit(): Promise<void> {
        this.products = await this.productService.getProducts();
    }
}
