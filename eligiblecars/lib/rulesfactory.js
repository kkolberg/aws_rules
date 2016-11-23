'use strict';

module.exports = function (totalweight, totalpallet) {
    var factory = function (ruleId) {

        var rule = null;
      
        switch (ruleId) {
            case 1:
                rule = totalweight;
                break;
            case 2:
                rule = totalpallet;
                break;
            default:
                rule = null;
        }

        return rule;
    };

    return {
        'factory': factory
    };
};
