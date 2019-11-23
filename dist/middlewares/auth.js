"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var authorization = function authorization(req, res, next) {
  var token = req.header('token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decodedPayload = _jsonwebtoken["default"].verify(token, 'jwtPrivateKey');

    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authorization;