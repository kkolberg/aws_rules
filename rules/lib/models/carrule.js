"use strict";

module.exports = function (sequelize, DataTypes) {
    var CarRule = sequelize.define("CarRule", {
        car_id: DataTypes.INTEGER.UNSIGNED,
        rule_id: DataTypes.INTEGER.UNSIGNED,
        values: DataTypes.STRING
    }, {
            timestamps: false,
            tableName: 'carrules'
        });

    return CarRule;
};