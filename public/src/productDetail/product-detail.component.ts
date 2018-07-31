import { Input, Component } from '@angular/core';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
    @Input() product: any;
    private title = 'Product Detail';
}
