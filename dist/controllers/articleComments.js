"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../models/database/index"));

var _identity = _interopRequireDefault(require("../models/database/identity"));

var _articleComments = require("../models/validators/articleComments");

require('../models/database/articleComments')();

var today = new Date();
var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(+today.getDate());
var time = "".concat(today.getHours(), ":").concat(today.getMinutes(), ":").concat(today.getSeconds());
var dateTime = "".concat(date, " ").concat(time);

var ArticleCommentController =
/*#__PURE__*/
function () {
  function ArticleCommentController() {
    (0, _classCallCheck2["default"])(this, ArticleCommentController);
  }

  (0, _createClass2["default"])(ArticleCommentController, null, [{
    key: "writeComment",
    value: function writeComment(req, res) {
      var _validate, error, comment, articleId, createdOn, createdBy, commentId, article;

      return regeneratorRuntime.async(function writeComment$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _validate = (0, _articleComments.validate)(req.body), error = _validate.error;

              if (!error) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: error.details[0].message
              }));

            case 3:
              comment = req.body.comment;
              articleId = req.params.articleId;
              createdOn = dateTime;
              createdBy = req.user.email;
              commentId = (0, _identity["default"])(10000);
              _context.next = 10;
              return regeneratorRuntime.awrap(_index["default"].query("SELECT * FROM articles WHERE articleId = ".concat(articleId)));

            case 10:
              article = _context.sent;

              if (!(article.rows.length === 0)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'Article with the specified ID NOT found'
              }));

            case 13:
              _context.next = 15;
              return regeneratorRuntime.awrap(_index["default"].query("INSERT INTO articles_comments (commentId, comment, createdOn, articleId, createdBy) \n        VALUES ($1, $2, $3, $4, $5)", [commentId, comment, createdOn, articleId, createdBy]));

            case 15:
              return _context.abrupt("return", res.status(201).json({
                status: 'sucess',
                data: {
                  message: 'Comment Successfully created',
                  createdOn: createdOn,
                  articleTitle: article.rows[0].title,
                  article: article.rows[0].article,
                  comment: comment
                }
              }));

            case 16:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);
  return ArticleCommentController;
}();

module.exports = ArticleCommentController;