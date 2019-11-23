"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateArticleComment = function validateArticleComment(comment) {
  var schema = _joi["default"].object().keys({
    comment: _joi["default"].string().max(100).required()
  });

  return schema.validate(comment);
};

module.exports.validate = validateArticleComment;