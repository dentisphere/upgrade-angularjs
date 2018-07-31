import { Input, Component, OnInit } from '@angular/core';
import { Product } from '../products/product.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
    product: Product;
    title = 'Product Detail';

    constructor(private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.product = data.product;
        });
    }
}
