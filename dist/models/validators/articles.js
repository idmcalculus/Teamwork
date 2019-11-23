"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateArticlePost = function validateArticlePost(article) {
  var schema = _joi["default"].object().keys({
    title: _joi["default"].string().max(50).required(),
    article: _joi["default"].string().max(2500).required(),
    categoryId: _joi["default"].number().required()
  });

  return schema.validate(article);
};

module.exports.validatePost = validateArticlePost;