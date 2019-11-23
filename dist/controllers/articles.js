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
  }]);
  return ArticleController;
}();

module.exports = ArticleController;