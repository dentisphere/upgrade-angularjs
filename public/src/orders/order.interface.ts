export interface OrderItem {
    productId: number;
    quantity: number;
    productName?: string;
    itemPrice?: number;
}

export interface Order {
    id: number;
    orderDate: string;
    customerId: number;
    totalCost: number;
    totalSale: number;
    totalItems: number;
    items: OrderItem[];
    customerName?: string;
}
