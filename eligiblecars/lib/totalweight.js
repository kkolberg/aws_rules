'use strict';

module.exports = function() {
    var run = function(order, cars, values) {
        var weightCal = function(order) {
            return order.items.reduce((sum, current) => (sum + (current.weight * current.qty)), 0);
        };

        var eligible = [];
        var filtered = cars.filtered;

        var weight = weightCal(order);

        cars.eligible.forEach((item) => {
            if (!values[item.id]) {
                eligible.push(item);
                return;
            }

            if (values[item.id] > weight) {
                eligible.push(item);
                return;
            }

            filtered.push(item);
        });


        return {
            eligible: eligible,
            filtered: filtered
        };
    };

    return {
        'run': run
    };
} ();
