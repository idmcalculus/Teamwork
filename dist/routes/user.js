"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _admin = _interopRequireDefault(require("../middlewares/admin"));

require("express-async-errors");

var router = (0, _express.Router)();
router.post("/v1/auth/create-user", _auth["default"], _admin["default"], _user["default"].createUserAccount);
module.exports = router;