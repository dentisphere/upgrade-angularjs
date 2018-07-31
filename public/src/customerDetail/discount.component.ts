import * as _ from 'lodash';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'discount',
    templateUrl: './discount.html',
})
export class DiscountComponent implements OnInit {
    @Input() customerDiscount: any;
    @Output() update = new EventEmitter<{ selectedDiscount: any }>();

    private edited = false;
    private isEdited: boolean;
    private selectedDiscount: any = null;
    private discounts = [
        {
            discountId: 2,
            discountPercent: 5,
            discountName: 'Friends & Family',
        },
        {
            discountId: 1,
            discountPercent: 10,
            discountName: 'Employee',
        },
        {
            discountId: 3,
            discountPercent: 20,
            discountName: 'Famous Drummer',
        },
    ];

    ngOnInit(): void {
        console.log(this);
        this.selectedDiscount = _.find(
            this.discounts,
            (discount: any) => discount.discountId === this.customerDiscount.discountId,
        );
    }

    edit(): void {
        this.isEdited = true;
    }

    save(): void {
        this.isEdited = false;
        this.update.emit({ selectedDiscount: this.selectedDiscount });
    }
}
