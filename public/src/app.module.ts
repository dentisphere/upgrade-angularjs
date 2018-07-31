import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import moduleName from './app.module.ajs';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
    imports: [BrowserModule, UpgradeModule],
    declarations: [HomeComponent, NavigationComponent],
    entryComponents: [HomeComponent, NavigationComponent],
})
export class AppModule {
    constructor(private upgrade: UpgradeModule) {}
    ngDoBootstrap() {
        this.upgrade.bootstrap(document.documentElement, [moduleName], { strictDi: true });
    }
}
