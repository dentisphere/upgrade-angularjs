import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './productDetail/product-detail.component';
import { OrderDetailComponent } from './orderDetail/order-detail.component';
import { CustomerDetailComponent } from './customerDetail/customer-detail.component';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CustomerDetailResolver } from './customerDetail/customer-detail.resolver';
import { OrderDetailResolver } from './orderDetail/order-detail.resolver';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'customers/:id', component: CustomerDetailComponent, resolve: { customer: CustomerDetailResolver } },
    { path: 'orders/:id', component: OrderDetailComponent, resolve: { order: OrderDetailResolver } },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        //
        { provide: APP_BASE_HREF, useValue: '' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CustomerDetailResolver,
        OrderDetailResolver,
    ],
})
export class AppRoutingModule {}
