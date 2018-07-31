import * as _ from 'lodash';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Discount } from '../customers/discount.interface';

@Component({
    selector: 'discount',
    templateUrl: './discount.component.html',
})
export class DiscountComponent implements OnInit {
    @Input() customerDiscount: Discount;
    @Output() update = new EventEmitter<SelectedDiscountEvent>();

    private edited = false;
    private isEdited: boolean;
    private selectedDiscount: Discount = null;
    private discounts: Discount[] = [
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
        this.selectedDiscount = _.find(
            this.discounts,
            discount => discount.discountId === this.customerDiscount.discountId,
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

export interface SelectedDiscountEvent {
    selectedDiscount: Discount;
}
