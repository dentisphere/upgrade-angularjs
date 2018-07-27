# upgrading an angularJs 1.3 project to angular 6 / webpack project

## organize by features

Related controllers, directives, services, templates and so forth should be organized by feature. One directory by feature. Make sure not to mix several things in a single file.

### instructions

-   create directory for one feature
-   move files to that directory
-   update paths in config.routes.js and index.html

### remarks

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

### remarks

in order to prevent upgrading minor version of packages, before installing dependencies, set `save-prefix` to `~`

```
npm config set save-prefix=~
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
