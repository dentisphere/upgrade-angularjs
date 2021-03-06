import { Discount } from './discount.interface';

export interface Customer {
    id?: number;
    fullName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    getsDiscount?: boolean;
    discount?: Discount;
}
