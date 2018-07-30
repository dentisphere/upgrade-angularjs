# upgrading an angularJs 1.3 project to angular 6 / webpack project

## organize by features

Related controllers, directives, services, templates and so forth should be organized by feature. One directory by feature. Make sure not to mix several things in a single file.

### instructions

-   create directory for each feature
-   move files to this new directory
-   update paths in `config.routes.js` and `index.html`

### notes

`templateUrl` is relative to `index.html`, not to the .js file where directive is declared. Hence, url should be similar to

```
    templateUrl: "./navigation/navigation.html",
```

Be consisent in directory names. Sam Julien uses camelcase for features, for instance `customerDetails`

Use a `shared` folder for services and factories that can be used in several elements.

## move dependencies to npm

in folder `public`, create a `package.json` with command

```bash
npm init
```

and install following packages

```
npm install --save angular@1.3
npm install --save angular-route@1.3
npm install --save jquery@2.2
npm install --save moment@2.17
npm install --save bootstrap@3.3
npm install --save lodash@4.17
```

update path in index.html, using corresponding .js files in node_modules, then delete unused vendor scripts in vendor directory

### notes

in order to prevent upgrading minor version of packages, before installing dependencies, set `save-prefix` to `~`

```
npm config set save-prefix=~
```

## upgrade angular to lattest version

upgrade one version at a time, and make sure nothing broke

```
npm install --save angular@1.4 angular-route@1.4
npm install --save angular@1.5 angular-route@1.5
npm install --save angular@1.6 angular-route@1.6
npm install --save angular@1.7 angular-route@1.7
```

angular@1.6 broke something about _hashprefix_. solution is to add some explicit configuration

solution is [here](https://stackoverflow.com/questions/41211875/angularjs-1-6-0-latest-now-routes-not-working)

```javascript
appModule.config([
    '$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('');
    },
]);
```

### notes

Upgrading to 1.6 or 1.7 is not necessary. We mostly want to use angular 1.5+ so that directives can be converted to components, easing future migration to angular

## converting controllers to components

steps:

-   include current code in IIFE + `'use strict'`
-   create option object for component with fields
    -   `templateUrl`
    -   `bindings` (empty object if no binding)
    -   `controller`
-   move controller function out of registration in module
-   use `$inject` to avoid minification problems with dependencies and remove `$scope` from list of dependencies
-   use a `ctrl` or `vm` variable to avoid closure problems
-   use `$onInit` for component initialisation, for instance to insure bindings have been made
-   register component in module
-   update template by adding `$ctrl.` to scope variables
-   update route
    -   `templateUrl` becomes a `template` with the component element
    -   remove `controller`

watch out when bound input must be synchronously resolved before creating element. bound input cannot be used before initialization

```javascript
ctrl.$onInit = function() {
    // ctrl.customer is not ready before $onInit !
    ctrl.address = addressFactory.getFullAddress(ctrl.customer);
};
```

input must be bound using $resolve service

```javascript
.when('/customers/:id', {
    template: '<customer-detail customer="$resolve.customer"></customer-detail>',
    resolve: {
        customer: [
            '$route',
            'customerService',
            function($route, customerService) {
                var id = parseInt($route.current.params.id);
                return customerService.getCustomer(id);
            },
        ],
    },
})
```

### notes

-   `templateUrl` is still relative to `index.html`
-   since we use IIFE, I don't see the point of naming component options and controllers with a specific name by feature. I prefer more generic `componentOptions` and `controller` when naming option object and controller function. **Edit:** it turns out that component must have a unique name, as it will be exported later, when component is registered in `app.ts`

-   to run prettier on all files (**edit : should be done sooner**):

```
npm install --save-dev --save-exact prettier
npx prettier --write **/*.js
```

If a template includes another template with `data-ng-include` directive, `$ctrl` must be used in included template... maybe a good idea would be to get rid of all `data-ng-include` before refactoring by creating a dedicated component ?

## add feature discount edition

to illustrate one-way binding and callback to parent component

## integrate webpack 4

In this step, we use webpack to create a bundle from an entry point (`app.js`). The bundle result (`public/dist/bundle.js`) is included manually in `index.html`.
We just want to initiate the bundle process, as a prerequisite for typescript integration

```
npm install --save-dev webpack webpack-cli clean-webpack-plugin
```

```javascript
// webpack.config.js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        filename: 'bundle.js',
    },
    plugins: [new CleanWebpackPlugin('dist')],
};
```

### notes

-   generate the bundle with command `npx webpack`
-   _clean-webpack-plugin_ is useful for cleaning _dist_ folder before generation the bundle
-   by default, output is created in _dist/_ (relative path to config file)
-   at the moment, application still need to be served statically (`static-server`)

## integrate typescript

```
npm install --save-dev typescript@2.7
npm install --save-dev @types/angular
npm install --save-dev ts-loader
```

Create a tsconfig.json file. Can be done by command `tsc --init`, or copy sample from [official documentation](https://angular.io/guide/typescript-configuration).

add a module rule for .ts files:

```javascript
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: 'inline-source-map',
};
```

rename _app.js_ and _home.js_ to _.ts_ files, and fix errors by importing necessary files

### notes

-   IIFE can be safely removed from components such as _home.ts_, since ts modules don't pollute global namespace

## add webpack-dev-server

we don't want to generate bundle manually each time source change.

```
npm install --save-dev webpack-dev-server
```

```javascript
module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: './',
        port: 9000,
    },
};
```

### notes

-   because we still include bundle manually in index.html, output path can be tricky to configure in a way that works both with build prod **and** webpack-dev-server.

solution is

```javascript
module.exports = {
    output: {
        filename: 'dist/bundle.js',
        path: path.resolve(__dirname),
    },
};
```

-   when webpack config change, webpack-dev-server must be restarted

## convert js files to ts files

no real difficulty. At the end of this step, we should have :

-   all angular components and services registration are in app.ts
-   no more .js file
-   type `any` added everywhere a type is needed (proper types will be added and used in next step)
-   only one script left in _index.html_

### notes

`@types` must be installed for some vendor libraries, such as _lodash_

## include css and sass in webpack

```
npm install --save-dev css-loader sass-loader style-loader file-loader node-sass
```

add rules to webpack config

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.scss?$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: 'file-loader',
            },
        ],
    },
};
```

last rules is needed to handle font files referenced in CSS files.

### notes

loaders are applied in reverse order, `css-loader` is applied **before** `style-loader`.

-   `sass-loader` loads a Sass/SCSS file and compiles it to CSS
-   `css-loader` interprets @import and url() like import/require() and will resolve them.
-   `style-loader` adds CSS to the DOM by injecting a <style> tag

## use real REST API

this step is not part of the migration process. Backend was mocked for simplicity, but now, we want to deal with a more realistic application.

The key is to configure devServer with a proxy pointing at the backend server.

```javascript
module.exports = {
    devServer: {
        contentBase: './',
        port: 9000,
        proxy: {
            '/api': 'http://localhost:9001',
        },
    },
};
```

when frontend calls `this.$http.get('/api/customers')`, the request is actually sent to the proxy address (assuming server is running and listening on port 9001)

### notes

-   since we deal with asynchronous results ($http methods returns promises), we should use `$q` service for the digest cycle to take place automatically when promise is fulfilled.
    So, at this point, we should prefer `$q.all` to `Promise.all` in a controller initialization for instance (**edit**: there is a better solution, see below).
-   when injecting a custom service like `ProductService`, declare it with its actual type, so that type inference can take place and prevents us of declaring further `any` parameters.
    For instance, since `productService.getProducts()` returns a `Promise<any[]>`, typescript compiler is able to infer that `data`
    in `productService.getProducts().then(data => ...)` will be an array
-   There is a trick for replacing global `Promise` object by angular's $q, just check _config.qAsPromise.ts_ file and how it is run in main module.
    There are several advantages coming with this technique:

    -   works as a polyfill for older browsers who don't support promises
    -   scope is applied automatically when promise is fulfilled (automatic UI refresh)
    -   we can use `async`/`await` syntax for cleaner code
    -   we don't need to inject `$q` anymore in application
    -   solves first note of this list :-)

    **EDIT** replacing Promise with `$q` seemed a good idea at the time, but it causes problems for tests where async/await hangs and test finally times out. These tests are
    skipped for now until a solution is found...

-   destructuring array works well when combined with `Promise.all`
-   `$http` service type is `ng.IHttpService`. This implies some change in our code as the service methods return `ng.IPromise` instead of regular `Promise`. **edit**: better way is to make
    the method calling `$http` service `async`.
-   More generally, all angular JS services `$xxx` have type `ng.IxxxService`.

```javascript
[ctrl.customers, ctrl.orders] = await Promise.all([customerService.getCustomers(), orderService.getOrders()]);
```

## replace `any` by proper types

require @types for angular-route

```
npm install --save-dev @types/angular-route
```

### notes

-   $http methods are generics, return type can be specified via <>

```
this.$http.get<any>('/api/customers').then(response => response.data);
```

## split webpack configuration for develoment and production

We want to distinguish configuration for development and production. Still, both configurations may share some configuration option. Thus,
we use four configuration file

-   _webpack-configs/webpack.common.js_ : shared configuration
-   _webpack-configs/webpack.dev.js_ : specific for development
-   _webpack-configs/webpack.prod.js_ : specific for production
-   _webpack.config.js_ : merges common configuration with dev or prod configuration according enviornement variable

To merge configuration files, we use `webpack-merge`, a simple function that creates a single configuration object from several separate
configuration objects.

```
npm install --save-dev webpack-merge
```

_webpack.config.js_ just merges two configurations. Notice how the configuration file now exports a **function** taking `env` argument and returning
a configuration object. This function is passed environment variables, so we can take specific actions according to some of these variables.

```javascript
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack-configs/webpack.common');

module.exports = env => {
    const envConfig = require(`./webpack-configs/webpack.${env.env}.js`);
    return webpackMerge.smart(commonConfig, envConfig);
};
```

Notice how we use javascript template string interpolation to require the desired config file according to `env.env` value.

In order to pass the appropriate variable, we can add an argument in npm scripts we use. In _package.json_ :

```json
{
    "scripts": {
        "build:prod": "npm run build -- --env.env=prod",
        "build": "webpack --bail --progress",
        "dev": "webpack-dev-server --env.env=dev"
    }
}
```

```bash
npm run build:prod
npm run dev
```

to configure properly both environments, several things must be done. We need several dependencies :

```
npm install --save-dev angular2-template-loader @types/node
npm install --save-dev html-webpack-plugin raw-loader
```

`html-webpack-plugin` adds our _index.html_ to the dist folder and adds automatically the `<script>` element to load our _bundle.js_.
This is handy as bundle name can be configured to add some _hash_ value, that changes each time the bundle changes. Thus, we no longer
need to include manually our bundle in _index.html_.

`raw-loader` allow to import files as string. This allow to require html files for a template, for instance.

because AOT techniques (see later) require to use templateUrl, `angular2-template-loader`
will inline html and styles in angular components. That way, we can keep `templateUrl' in declarations such as :

```javascript
export let customersComponent: ng.IComponentOptions = {
    templateUrl: './customers.html',
    bindings: {},
    controller,
};
```

However, it is important to give a path relative to **current file** (no more relative to index.html)

`@types/node` is required to avoid compile error when require html files (either directly, or through `angular2-template-loader`)

Another optimization is about CSS. Plugins `mini-css-extract-plugin` and `optimize-css-assets-webpack-plugin` can be used in production to create
a separate CSS asset that is automatically added to _index.html_

### notes

-   webpack 4 is easier to configure than previous versions, as long as we use default values. There is now a `mode` key that should be
    specified in configuration, with smart default values.
-   we use `webpackMerge.smart(...)` to anticipate next steps. webpack-merge.smart is aware of the shape of a webpack configuration
    and allows you to update only the rule you want. It was not necessary at this point to use the `smart` function, we could as well
    use `webpackMerge(...)`.
-   server is configured to serve static files from `../dist/` (path is relative to _server.js_). This is the reason why _index.html_ must be part of the distribution.
-   _dist_ folder is now outside the _public_ folder where webpacks resides. By default, the `CleanWebpackPlugin` does not allow to clean a folder
    outside the project, we must use a dedicated option to bypass this limitation.

### move all source files to _src_ folder

Requires some tuning in webpack configuration files. No difficulty.
File structure is now closer to an angular 2+ project structure

## configure tests

interesting ressource https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai

There are some differences compared to original course because I wanted to use mocha/chai instead of jasmine. I also wanted to use
_ChromeHeadless_ as browser used for tests.

Main dependencies added to the project are :

-   `@types/angular-mocks`
-   `@types/chai`
-   `@types/mocha`
-   `@types/webpack`
-   `angular-mocks`
-   `chai`
-   `karma`
-   `karma-chai`
-   `karma-chrome-launcher`
-   `karma-mocha`
-   `karma-mocha-reporter`
-   `karma-webpack`
-   `mocha`

karma config file can be created with command

```bash
npx karma init
```

to avoid test framework to create a bundle for each test, we configure a **unique** test, `webpack.tests.js` :

```javascript
import 'angular';
import 'angular-mocks';
import './src/app';

let testsContext = require.context('./src', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
```

this `require.context` method creates a function that is then applied to each _.spec_ file present in _src_ folder

In karma config file, we specify the `webpack` preprocessor to create the bundle when test is started. The preprocessor must be configured
with same options we use when we actually create the bundle. We want to use same options as for development, except that we don't need `devServer`.
I just created another config file specific to test environment and use it in _karma.conf.js_

```javascript
module.exports = function(config) {
    config.set({
        preprocessors: {
            'webpack.tests.js': ['webpack'],
        },
        webpack: require('./webpack.config')({ env: 'test' }),
    });
};
```

Notice how we use mais webpack config as a function for merging common and test config.

Finally, we add a script in _package.json_ to start test with command `npm test`.

Once karma started, it watches for change, meaning that each time a file is modified, added or deleted, bundle is generated and all tests are run again.

For more interesting tests, we add sinon library to create test doubles. It's important to understand the differences between type of test doubles (check this [interesting article](https://semaphoreci.com/community/tutorials/best-practices-for-spies-stubs-and-mocks-in-sinon-js) for
more info):

-   spy: allows assertions on calls, arguments... the original function behaviour is not affected.
-   stub: like spy, but **replace** the target function. Use them when:
    -   replace problematic pieces of code (network, database...)
    -   trigger code paths (error handling)
    -   test asynchronous code
-   Mocks should be used primarily when you would use a stub, but need to verify multiple more specific behaviors on it.

### notes

-   There is some kind of bug in karma-webpack that can lead to confusion when using watch mode. This seems related to the way the preprocessor handles modules loaded with
    `require.context('./src', true, /\.spec$/)`. See this [issue on github](https://github.com/webpack-contrib/karma-webpack/issues/49).
    Symptoms: when there are syntax errors in spec file:

    -   no error is reported to user
    -   tests written in the spec file are not executed

    The only clue for user that something went wrong is the total number of tests which is lower than it should be, but everything is green and this cannot be part of an automated validation process. I did not find a solution for this problem. There is a workaround to prevent webpack to generate its assets, so that no test are run at all, but this does not work for all errors, thus not reliable.
    Note: when enabling `singleRun` option in _karma.conf.js_, the syntax error is properly reported.

### conclusion about unit testing in angularJS

setting up tests was exciting at first, but I encounter many issues that makes me think there are limitations in what we can write for a test

-   compiling directives or components and make assumptions on html is tricky. I could not find a way to use jQuery for getting desired elements and JQlite is too limited,
    i could not find a way to write expectation like _"text of first <td> in first <row> equals some value"_
-   dealing with asynchronous code is difficult. Part of the problem seems related to the trick where $q replaces Promise to allow await/async. When I don't use the trick,
    I could not check expectation about component html because `ctrl.$onInit` is done asynchronously, and it forces us to add calls to `$scope.digest()` whenever an async
    call is done. On the other hand, with trick enabled, calling `ctrl.$onInit` does not resolve, leaving us with timeout in tests.
-   using TypeScript for tests may be cumbersome. It forces to add several imports for typescript compiler to shut up, while this is not necessary in JavaScript.

## setup angular 6

requires some dependencies.

```bash
npm install --save @angular/common  @angular/compiler @angular/core @angular/forms
npm install --save @angular/http @angular/platform-browser @angular/platform-browser-dynamic @angular/router
npm install --save @angular/upgrade
npm install --save core-js reflect-metadata rxjs zone.js
```

rename app.ts to app.module.ajs.ts (ajs stands for angularJs) and export module name

create app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import moduleName from './app.module.ajs';

@NgModule({
    imports: [BrowserModule, UpgradeModule],
})
export class AppModule {
    constructor(private upgrade: UpgradeModule) {}
    ngDoBootstrap() {
        this.upgrade.bootstrap(document.documentElement, [moduleName], { strictDi: true });
    }
}
```

UpgradeModule is used to bootstrap ajs module when our angular module is bootstrapped.

create main.ts that will become our webpack entry point

```typescript
import 'zone.js';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { setAngularLib } from '@angular/upgrade/static';
import * as angular from 'angular';
import { AppModule } from './app.module';

setAngularLib(angular);
platformBrowserDynamic().bootstrapModule(AppModule);
```

This is the standard way to bootstrap an angular application from our angular module. We also use `setAngularLib` to load angularJs framework. This is a temporary instruction
that will be removed once application has been totally upgraded. Zone.js and reflect-metadata are part of the upgrade process (TODO: check what are they for)

Because we bootstrap the application from main.ts, we remove ng-app directive from index.html

The Promise replacement by $q causes an error. We remove it and notice than everything works fine, except that bundle size is doubled in dev (about 6.2 MB versus 3.0 MB)
and is also larger in prod (1.6 MB)

We now have a starting point for upgrading our angular js elements to angular

# initial readme

## Order System Sample Project

This is the repo for the [Upgrading AngularJS](http://www.upgradingangularjs.com) sample project. This project is used starting in course 1, module 2, until the end of course 3.

You may see slight variations in this sample code from the course videos. That just means certain files or pieces of code were removed because they weren't needed, or that improvements were made to the sample project. All of the core functionality will be in both the videos and the project.

I've made commits at each module and each assignment throughout all three courses.

### Server

This project comes with an Express server (the `server` folder) that you'll use beginning in course 2, module 6.

Prior to then, you can just use a simple http server such as [static-server](https://www.npmjs.com/package/static-server) to serve up the `public` folder. To use `static-server`:

1.  Install globally by running `npm -g install static-server`
2.  `cd` into the `public` folder
3.  Run `static-server`

Once you've reached course 2, module 6, here's how to run the Express server:

1.  `cd` into the `server` folder
2.  Run `npm install`
3.  Run `npm start`

Note that both of these options will require [node](http://www.nodejs.org) to be installed (which we cover in course 1, module 3).
