import 'zone.js';
import 'reflect-metadata';
import { platformBrowser } from '@angular/platform-browser';
import { setAngularLib } from '@angular/upgrade/static';
import { AppModuleNgFactory } from './app.module.ngfactory';
import { enableProdMode } from '@angular/core';

import * as angular from 'angular';
import { AppModule } from './app.module';

setAngularLib(angular);
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
