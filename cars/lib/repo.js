'use strict';

module.exports = function (models) {

  var index = function (callback) {
    models.Car.findAll({
      order: [['id', 'ASC']]
    }).then(function (cars) {
      callback(null, cars);
    }, function (err) {
      callback(err);
    });

  };

  var select = function (id, callback) {
    models.Car.findById(id).then(function (car) {
      callback(null, car);
    }, function (err) {
      callback(err);
    });
  };

  var create = function (name, callback) {

    models.Car.create({ 'name': name }).then(function (car) {
      callback(null, car);
    }, function (err) {
      callback(err);
    });
  };

  var update = function (id, name, callback) {

    models.Car.update({ 'name': name }, { 'where': { 'id': id } }).then(function (car) {
      callback(null, car);
    }, function (err) {
      callback(err);
    });
  };


  return {
    index: index,
    create: create,
    update: update
  };
};