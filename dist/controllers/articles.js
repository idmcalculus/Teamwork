"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../models/database/index"));

var _identity = _interopRequireDefault(require("../models/database/identity"));

var _articles = require("../models/validators/articles");

require('../models/database/articles')();

var today = new Date();
var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(+today.getDate());
var time = "".concat(today.getHours(), ":").concat(today.getMinutes(), ":").concat(today.getSeconds());
var dateTime = "".concat(date, " ").concat(time);

var ArticleController =
/*#__PURE__*/
function () {
  function ArticleController() {
    (0, _classCallCheck2["default"])(this, ArticleController);
  }

  (0, _createClass2["default"])(ArticleController, null, [{
    key: "createSingleArticle",
    value: function createSingleArticle(req, res) {
      var _validatePost, error, _req$body, title, article, categoryId, createdOn, articleId, category, createdBy;

      return regeneratorRuntime.async(function createSingleArticle$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _validatePost = (0, _articles.validatePost)(req.body), error = _validatePost.error;

              if (!error) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: error.details[0].message
              }));

            case 3:
              _req$body = req.body, title = _req$body.title, article = _req$body.article, categoryId = _req$body.categoryId;
              createdOn = dateTime;
              articleId = (0, _identity["default"])(5484621);
              _context.next = 8;
              return regeneratorRuntime.awrap(_index["default"].query("SELECT * FROM categories WHERE categoryId = ".concat(categoryId)));

            case 8:
              category = _context.sent;

              if (!(category.rows.length === 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'Category with the specified categoryId NOT found'
              }));

            case 11:
              createdBy = req.user.email;
              _context.next = 14;
              return regeneratorRuntime.awrap(_index["default"].query("INSERT INTO articles (articleId, title, article, createdOn, categoryId, createdBy) \n          VALUES ($1, $2, $3, $4, $5, $6)", [articleId, title, article, createdOn, categoryId, createdBy]));

            case 14:
              return _context.abrupt("return", res.status(201).json({
                status: 'sucess',
                data: {
                  message: 'Article successfully posted',
                  articleId: articleId,
                  createdOn: createdOn,
                  title: title
                }
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getAllArticles",
    value: function getAllArticles(req, res) {
      var articles;
      return regeneratorRuntime.async(function getAllArticles$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT * FROM articles ORDER BY createdOn DESC'));

            case 2:
              articles = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 'Success',
                data: articles.rows
              }));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "getSingleArticle",
    value: function getSingleArticle(req, res) {
      var articleId, article;
      return regeneratorRuntime.async(function getSingleArticle$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              articleId = req.params.articleId;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_index["default"].query("SELECT * FROM articles WHERE articleId = ".concat(articleId)));

            case 3:
              article = _context3.sent;

              if (!(article.rows.length === 0)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'Article with the specified articleId NOT found'
              }));

            case 6:
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                data: article.rows[0]
              }));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "updateSingleArticle",
    value: function updateSingleArticle(req, res) {
      var _validateEdit, error, articleId, owner, _req$body2, title, article;

      return regeneratorRuntime.async(function updateSingleArticle$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _validateEdit = (0, _articles.validateEdit)(req.body), error = _validateEdit.error;

              if (!error) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                message: error.details[0].message
              }));

            case 3:
              articleId = req.params.articleId;
              _context4.next = 6;
              return regeneratorRuntime.awrap(_index["default"].query("SELECT * FROM articles WHERE articleId = ".concat(articleId)));

            case 6:
              owner = _context4.sent;

              if (!(owner.rowCount === 0)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                message: 'Article Not Found'
              }));

            case 9:
              if (!(owner.rows[0].createdby !== req.user.email)) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", res.status(403).json({
                status: 'error',
                message: 'You cannot edit this article'
              }));

            case 11:
              _req$body2 = req.body, title = _req$body2.title, article = _req$body2.article;
              _context4.next = 14;
              return regeneratorRuntime.awrap(_index["default"].query("UPDATE articles\n            SET title = $1, article = $2\n            WHERE articleId = ".concat(articleId), [title, article]));

            case 14:
              return _context4.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  message: 'Article successfully updated',
                  title: title,
                  article: article
                }
              }));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);
  return ArticleController;
}();

module.exports = ArticleController;