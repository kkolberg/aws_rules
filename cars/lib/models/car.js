"use strict";

module.exports = function (sequelize, DataTypes) {
    var Car = sequelize.define("Car", {
        name: DataTypes.STRING
    },{
        timestamps: false,
        tableName: 'cars'
    });

    return Car;
};