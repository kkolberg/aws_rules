"use strict";

module.exports = function (sequelize, DataTypes) {
    var Rule = sequelize.define("Rule", {
        name: DataTypes.STRING
    },{
        timestamps: false,
        tableName: 'rules'
    });

    return Rule;
};