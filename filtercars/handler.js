'use strict';

var aws = require('aws-sdk');
aws.config.region = 'us-east-1'
var lambda = new aws.Lambda();
var filtercars = require('./lib/filtercars')(lambda);

// Lambda Handler
module.exports.handler = function (event, context, callback) {
  context.callbackWaitesForEmptyEventLoop = false;

  filtercars.handle(event, context, callback);

};
