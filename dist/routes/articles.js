"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _articles = _interopRequireDefault(require("../controllers/articles"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = _express["default"].Router();

router.post('/articles', _auth["default"], _articles["default"].createSingleArticle);
router.get('/articles', _auth["default"], _articles["default"].getAllArticles);
module.exports = router;