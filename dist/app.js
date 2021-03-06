"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("./routes/user"));

var _articles = _interopRequireDefault(require("./routes/articles"));

var _articleCategory = _interopRequireDefault(require("./routes/articleCategory"));

var _gifs = _interopRequireDefault(require("./routes/gifs"));

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/api/v1', _user["default"]);
app.use('/api/v1', _articles["default"]);
app.use('/api/v1', _articleCategory["default"]);
app.use('/api/v1', _gifs["default"]);
module.exports = app;