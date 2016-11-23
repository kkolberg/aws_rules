'use strict';

// Require Logic
var models = require('./lib/models');
var repo = require('./lib/repo')(models);
var carrules = require('./lib/carrules')(repo);

// Lambda Handler
module.exports.handler = function(event, context, callback) {
  context.callbackWaitesForEmptyEventLoop = false;

  carrules.handle(event, context, callback);

};
