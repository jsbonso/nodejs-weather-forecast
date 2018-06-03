var path = require('path');
process.env.NODE_ENV = 'test';
global.appRoot = path.normalize(__dirname + '../../');
global.config  = require(global.appRoot + '/config');