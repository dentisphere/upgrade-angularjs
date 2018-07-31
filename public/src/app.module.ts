import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import moduleName from './app.module.ajs';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DiscountComponent } from './customerDetail/discount.component';

@NgModule({
    imports: [BrowserModule, UpgradeModule, FormsModule],
    declarations: [HomeComponent, NavigationComponent, DiscountComponent],
    entryComponents: [HomeComponent, NavigationComponent, DiscountComponent],
})
export class AppModule {
    constructor(private upgrade: UpgradeModule) {}
    ngDoBootstrap() {
        this.upgrade.bootstrap(document.documentElement, [moduleName], { strictDi: true });
    }
}
