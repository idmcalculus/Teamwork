"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateUser = function validateUser(user) {
  var schema = _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(6).max(50).required()
  });

  return schema.validate(user);
};

module.exports.validateLogin = validateUser;