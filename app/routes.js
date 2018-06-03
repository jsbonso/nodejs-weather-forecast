const path    = require('path');
const glob    = require('glob');
const express = require('express');

module.exports = function (app) {
    'use strict';

    let routesPath  = path.normalize(global.appRoot + '/app/api');
    let globPattern = routesPath + '/**/**/index.js';

    glob(globPattern, function (err, routes) {
        if(err) {
            global.logger.error("Error while injecting routes into routepath. Could not glob " + globPattern);
        } else {
            routes.forEach(function (originalRoute) {
                let routeName = path.relative(routesPath, originalRoute);
                let route     = (`/api/${routeName}`).replace('/index.js', '');

                // Inject route
                app.use(route, require(global.appRoot + '/app' + route));
            });
        }

        app.use("/js",   express.static(global.appRoot + '/views/js'));
        

        // Route to the login page
        app.get('/', function (req, res) {
            res.render('index', {
            });
        });

    });

};
