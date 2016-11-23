'use strict';

// Require Logic
var models = require('./lib/models');
var repo = require('./lib/repo')(models);
var cars = require('./lib/cars')(repo);

// Lambda Handler
module.exports.cars = function(event, context, callback) {
  context.callbackWaitesForEmptyEventLoop = false;

  cars.handle(event, context, callback);

};
