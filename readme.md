# upgrading an angularJs 1.3 project to angular 6 / webpack project

## organize by features

Related controllers, directives, services, templates and so forth should be organized by feature. One directory by feature. Make sure not to mix several things in a single file.

### instructions

-   create directory for one feature
-   move files to that directory
-   update paths in config.routes.js and index.html

### notes

`templateUrl` is relative to index.html, not to the .js file where directive is declared. Hence, url should be similar to

```
    templateUrl: "./navigation/navigation.html",
```

Be consisent in directory names. Sam Julien uses camelcase for features, for instance `customerDetails`

Use a `shared` folder for services and factories that can be used in several elements.

## move dependencies to npm

in folder `public`, create a package.json with command

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

angular@1.6 broke something about hashprefix. solution is to add some explicit configuration

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

Upgrading to 1.6 or 1.7 is not necessary. We mostly want to use angular 1.5+ so that directives can be converted to component, easing future migration to angular

## converting controllers to components

steps:

-   include current code in IIFE + `'use strict'`
-   create option object for component with fields
    -   templateUrl
    -   bindings
    -   controller
-   move controller function out of registration in module
-   use $inject to avoid minification problems with dependencies and remove $scope from list of dependencies
-   use a `ctrl` or `vm` variable to avoid closure problemes
-   use $onInit for component initialisation, for instance to insure bindings have been made
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

bound input must be bound using $resolve service

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
-   since we use IIFE, I don't see the point of naming component options and controllers with a specific name by feature. I prefer more generic `componentOptions` and `controller` when naming option object and controller function

to run prettier on all files :

```
npm install --save-dev --save-exact prettier
npx prettier --write **/*.js
```

If a template includes another template with `data-ng-include` directive, $ctrl must be used in included template... maybe a good idea would be to get rid of all data-ng-include before refactoring by creating a proper component ?

## add feature discount edition

to illustrate one-way binding and callback to parent component

## integrate webpack 4

In this step, we use webpack to create a bundle from an entry point (app.js). The bundle result (public/dist/bundle.js) is included manually in index.html.
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
-   clean-webpack-plugin is useful for cleaning dist folder before generation the bundle
-   by default, output is created in dist/ (relative path to config file)
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

rename app.js and home.js to .ts files, and fix errors by importing necessary files

### notes

-   IIFE can be safely removed from components such as home.ts, since ts modules don't pollute global namespace

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

because we still include bundle manually in index.html, output path can be tricky to configure in a way that works both with build prod **and** webpack-dev-server.

solution is

```javascript
module.exports = {
    output: {
        filename: 'dist/bundle.js',
        path: path.resolve(__dirname),
    },
};
```

## convert js files to ts files

no real difficulty. At the end of this step, we should have :

-   all angular components and services registration are in app.ts
-   no more js file
-   type 'any' added everywhere a type is needed (proper types will be added and used in next step)
-   only one script left in index.html

### notes

@types must be installed for some vendor libraries, such as lodash

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

last rules is needed to handle font files referenced in css files.

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

-   since we deal with asynchronous results ($http methods returns promises), we should use $q service for the digest cycle to take place automatically when promise is fulfilled.
    So, at this point, we should prefer `$q.all` to `Promise.all` in a controller initialization for instance.
-   when injecting a custom service like ProductService, declare it with its actual type, so that type inference can take place and prevents us of declare further `any` parameters.
    For instance, since `productService.getProducts()` returns a `Promise<any[]>`, typescript compiler is able to infer that `data`
    in `productService.getProducts().then(data => ...)` will be an array
-   There is a trick for replacing global Promise object by angular's $q, just check config.qAsPromise.ts file and how it is run in main module.
    There are several advantages with this technique:
    -   works as a polyfill for older browser who don't support promises
    -   scope is applied automatically when promise is fulfilled:
    -   we can use async/await syntax for cleaner code
    -   we don't need to inject $q anymore
    -   solves first note :-)
-   destructuring array works well when combined with `Promise.all`
-   $http service type is `ng.IHttpService`. This implies some change in our code as the service methods return `ng.IPromise` instead of regular `Promise`
-   More generally, all angular JS services `$xxx` have type `ng.IxxxService`.

```javascript
[ctrl.customers, ctrl.orders] = await Promise.all([customerService.getCustomers(), orderService.getOrders()]);
```

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
