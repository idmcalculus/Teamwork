"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _admin = _interopRequireDefault(require("../middlewares/admin"));

require("express-async-errors");

var router = _express["default"].Router();

router.post('/auth/create-user', _auth["default"], _admin["default"], _user["default"].createUserAccount);
module.exports = router;