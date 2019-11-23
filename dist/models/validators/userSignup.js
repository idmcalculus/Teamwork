"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateUser = function validateUser(user) {
  var schema = _joi["default"].object().keys({
    firstName: _joi["default"].string().min(3).max(50).required(),
    lastName: _joi["default"].string().min(3).max(50).required(),
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(4).max(50).required(),
    gender: _joi["default"].string().required(),
    jobRole: _joi["default"].string().min(3).max(50).required(),
    department: _joi["default"].string().min(3).max(50).required(),
    address: _joi["default"].string().min(3).max(50).required(),
    isAdmin: _joi["default"]["boolean"]()
  });

  return schema.validate(user);
};

module.exports.validateSignup = validateUser;