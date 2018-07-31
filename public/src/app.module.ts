import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import moduleName from './app.module.ajs';
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

@NgModule({
    imports: [BrowserModule, UpgradeModule, FormsModule],
    declarations: [
        //
        CustomerDetailComponent,
        CustomersComponent,
        DiscountComponent,
        HomeComponent,
        NavigationComponent,
    ],
    entryComponents: [
        //
        CustomerDetailComponent,
        CustomersComponent,
        DiscountComponent,
        HomeComponent,
        NavigationComponent,
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
})
export class AppModule {
    constructor(private upgrade: UpgradeModule) {}
    ngDoBootstrap() {
        this.upgrade.bootstrap(document.documentElement, [moduleName], { strictDi: true });
    }
}
