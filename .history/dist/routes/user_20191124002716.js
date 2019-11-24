"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("express-async-errors");

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _admin = _interopRequireDefault(require("../middlewares/admin"));

var router = _express["default"].Router();

router.post('/auth/create-user', _user["default"].createUserAccount);
router.post('/auth/login', _user["default"].loginUser);
module.exports = router;