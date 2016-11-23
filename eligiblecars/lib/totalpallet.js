'use strict';

module.exports = function() {

    var run = function(order, cars, values) {

        var palletCal = function(order) {
            return order.items.reduce((sum, current) => (sum + (current.pallets * current.qty)), 0);
        };

        var eligible = [];
        var filtered = cars.filtered;

        var pallets = palletCal(order);

        cars.eligible.forEach((item) => {
            if (!values[item.id]) {
                eligible.push(item);
                return;
            }

            if (values[item.id] > pallets) {
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
