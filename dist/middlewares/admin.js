"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  if (req.body.isAdmin === false) {
    return res.status(403).send('Oops! You are not allowed to perform this process');
  }

  next();
};

exports["default"] = _default;