"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _identity = _interopRequireDefault(require("../models/database/identity"));

var _index = _interopRequireDefault(require("../models/database/index"));

require('../models/database/gifs')();

_dotenv["default"].config();

_cloudinary["default"].config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

var GifsController =
/*#__PURE__*/
function () {
  function GifsController() {
    (0, _classCallCheck2["default"])(this, GifsController);
  }

  (0, _createClass2["default"])(GifsController, null, [{
    key: "postGifs",
    value: function postGifs(req, res) {
      var file, title, gifscloud, secureUrl, createdOn, publicId, identity, createdBy;
      return regeneratorRuntime.async(function postGifs$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              file = req.files.image;

              if (file) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                message: 'Image is required'
              }));

            case 3:
              title = req.body.title;

              if (title) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'title is required'
              }));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(_cloudinary["default"].v2.uploader.upload(file.tempFilePath));

            case 8:
              gifscloud = _context.sent;
              secureUrl = gifscloud.secure_url, createdOn = gifscloud.created_at, publicId = gifscloud.public_id;
              identity = (0, _identity["default"])(100000);
              createdBy = req.body.email;
              _context.next = 14;
              return regeneratorRuntime.awrap(_index["default"].query("INSERT INTO gifs (gifId, title, imageUrl, createdOn, publicId, createdBy) \n          VALUES ($1, $2, $3, $4, $5, $6)", [identity, title, secureUrl, createdOn, publicId, createdBy]));

            case 14:
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  gifId: identity,
                  message: 'GIF image successfully posted.',
                  createdOn: createdOn,
                  title: title,
                  imageUrl: secureUrl,
                  createdBy: createdBy
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
  return GifsController;
}();

module.exports = GifsController;