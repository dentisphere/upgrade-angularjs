import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';
import 'jquery';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DiscountComponent } from './customerDetail/discount.component';
import { httpServiceProvider } from './ajs-upgraded.providers';
import { CustomerService } from './customers/customer.service';
import { OrderService } from './orders/order.service';
import { ProductService } from './products/product.service';
import { AddressService } from './shared/address.service';
import { AuthenticationService } from './shared/authentication.service';
import { CustomerDetailComponent } from './customerDetail/customer-detail.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderDetailComponent } from './orderDetail/order-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailComponent } from './productDetail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
    declarations: [
        //
        AppComponent,
        CustomerDetailComponent,
        CustomersComponent,
        DiscountComponent,
        HomeComponent,
        NavigationComponent,
        OrderDetailComponent,
        OrdersComponent,
        ProductDetailComponent,
        ProductsComponent,
    ],
    entryComponents: [
        //
        CustomerDetailComponent,
        CustomersComponent,
        DiscountComponent,
        HomeComponent,
        NavigationComponent,
        OrderDetailComponent,
        OrdersComponent,
        ProductDetailComponent,
        ProductsComponent,
    ],
    providers: [
        //
        AddressService,
        AuthenticationService,
        CustomerService,
        httpServiceProvider,
        OrderService,
        ProductService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
