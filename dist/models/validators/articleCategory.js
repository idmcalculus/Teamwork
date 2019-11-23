"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateCategory = function validateCategory(category) {
  var schema = _joi["default"].object().keys({
    categoryName: _joi["default"].string().min(2).max(50).required()
  });

  return schema.validate(category);
};

module.exports.validate = validateCategory;