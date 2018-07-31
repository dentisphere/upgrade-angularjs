import { Input, Component } from '@angular/core';
import { Product } from '../products/product.interface';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
    @Input() product: Product;
    private title = 'Product Detail';
}
