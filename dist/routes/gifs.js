"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _gifs = _interopRequireDefault(require("../controllers/gifs"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = _express["default"].Router();

router.use((0, _expressFileupload["default"])({
  useTempFiles: true
}));
router.post('/gifs', _auth["default"], _gifs["default"].postGifs);
router.get('/gifs', _auth["default"], _gifs["default"].getAllGifs);
router.get('/gifs/:gifId', _auth["default"], _gifs["default"].getSingleGif);
module.exports = router;