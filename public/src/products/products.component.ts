import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
    private title = 'Products';
    products: any[];

    constructor(private productService: ProductService) {}

    async ngOnInit(): Promise<void> {
        this.products = await this.productService.getProducts();
    }
}
