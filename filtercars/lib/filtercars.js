'use strict';

module.exports = function (lambda) {
    var handle = function (event, context, callback) {
        const done = function (err, res) {
            callback(null, {
                statusCode: err ? '400' : '200',
                body: err ? JSON.stringify({ error: err.message }) : JSON.stringify(res),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        };

        var callEligible = function (rules, cb) {
            var payload = {
                'order': JSON.parse(event.body),
                'rules': rules
            };

            var requestEvent = {
                'body': JSON.stringify(payload)
            };

            var params = {
                FunctionName: 'eligiblecars-dev-eligiblecars',
                Payload: JSON.stringify(requestEvent),
            };

            lambda.invoke(params, (err, result) => {
                if (err) {
                    return cb(err, null);
                }

                cb(null, JSON.parse(JSON.parse(result.Payload).body));
            });
        };

        var callCarRules = function (cb) {
            var params = {
                FunctionName: 'carrules-dev-carrules',
                Payload: '{ "httpMethod" : "GET" }',
            };

            lambda.invoke(params, cb);
        };

        callCarRules((err, carRules) => {
            if (err) {
                return done(err, null);
            }

            callEligible(JSON.parse(JSON.parse(carRules.Payload).body), done);
        });
    };

    return {
        'handle': handle
    };
};
