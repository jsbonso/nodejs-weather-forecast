'use strict';

var compression    = require('compression');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var cors           = require('cors');
var handleBars     = require('express-handlebars');

module.exports = function (app) {
    app.set('views', global.appRoot + '/views');
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());

    var corsOptions = {};
    if (global.config.origins) {
        corsOptions.origin = global.config.origins;
    }

    app.use(cors(corsOptions));
    process.setMaxListeners(100);

    var hbs = handleBars.create({
    });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
};
