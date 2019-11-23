"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _articles = _interopRequireDefault(require("../controllers/articles"));

var _articleCategory = _interopRequireDefault(require("../controllers/articleCategory"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _admin = _interopRequireDefault(require("../middlewares/admin"));

var router = _express["default"].Router();

router.get('/categories', _auth["default"], _admin["default"], _articleCategory["default"].getAllCategories);
router.get('/categories/:id', _auth["default"], _admin["default"], _articleCategory["default"].getSingleCategory);
router.post('/categories', _auth["default"], _admin["default"], _articleCategory["default"].createSingleCategory);
router.patch('/categories/:id', _auth["default"], _admin["default"], _articleCategory["default"].updateSingleCategory);
router["delete"]('/categories/:id', _auth["default"], _admin["default"], _articleCategory["default"].deleteSingleCategory);
router.get('/categories/:categoryId/articles', _auth["default"], _articles["default"].getArticlesInCategory);
module.exports = router;