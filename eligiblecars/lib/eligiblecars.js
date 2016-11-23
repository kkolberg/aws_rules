'use strict';

module.exports = function (rulesfactory) {
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

        var body = JSON.parse(event.body);

        var cars = {
            eligible: [].concat(body.order.cars),
            filtered: []
        };

        body.rules.forEach((ruleItem) => {
            var rule = rulesfactory.factory(ruleItem.id);

            if (!rule) {
                return;
            }

            cars = rule.run(body.order, cars, ruleItem.CarRules);
        });

        done(null, cars);
    };

    return {
        'handle': handle
    };
};
