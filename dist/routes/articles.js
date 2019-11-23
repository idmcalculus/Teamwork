"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _articles = _interopRequireDefault(require("../controllers/articles"));

var _articleComments = _interopRequireDefault(require("../controllers/articleComments"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = _express["default"].Router();

router.post('/articles', _auth["default"], _articles["default"].createSingleArticle);
router.get('/articles', _auth["default"], _articles["default"].getAllArticles);
router.get('/articles/:articleId', _auth["default"], _articles["default"].getSingleArticle);
router.patch('/articles/:articleId', _auth["default"], _articles["default"].updateSingleArticle);
router["delete"]('/articles/:articleId', _auth["default"], _articles["default"].deleteSingleArticle);
router.post('/articles/:articleId/comment', _auth["default"], _articleComments["default"].writeComment);
module.exports = router;