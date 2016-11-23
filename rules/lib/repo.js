'use strict';

module.exports = function (models) {

  var index = function (callback) {
    models.Rule.findAll({
      include: [{ model: models.CarRule }],
      order: [['id', 'ASC']]
    }).then(function (carrules) {
      callback(null, carrules.map((rule) => {
        var val = rule.get({ plain: true });
        return val;
      }));
    }, function (err) {
      callback(err);
    });

  };

  return {
    index: index
  };
};