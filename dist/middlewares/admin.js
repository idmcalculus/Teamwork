"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  if (req.user.isAdmin === false) {
    return res.status(403).send('Not allowed to perform this process');
  }

  next();
};

exports["default"] = _default;