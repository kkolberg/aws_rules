'use strict';

var totalpallet = require('./lib/totalpallet');
var totalweight = require('./lib/totalweight');
var factory = require('./lib/rulesfactory')(totalweight, totalpallet);
var eligiblecars = require('./lib/eligiblecars')(factory);

// Lambda Handler
module.exports.handler = function (event, context, callback) {
  context.callbackWaitesForEmptyEventLoop = false;

  eligiblecars.handle(event, context, callback);

};
