'use strict';

module.exports = function (repo) {
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

        const transform = function (res) {
            res.forEach((rule) => {
                var carRuleMap = {};
                rule.CarRules.forEach((carRule) => {
                    carRuleMap[carRule.car_id] = JSON.parse(carRule.values);
                });
                rule.CarRules = carRuleMap;
            });
        };

        switch (event.httpMethod) {
            case 'GET':
                repo.index(function (err, res) {
                    if (err) {
                        done(err, null);
                    } else {
                        transform(res)
                        done(null, res);
                    }
                });
                break;
            default:
                done(new Error('Unsupported method "${event.httpMethod}"'));
        }
    };

    return {
        'handle': handle
    };
};
