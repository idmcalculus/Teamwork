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
      var file, title, gifsCloud, secureUrl, createdOn, publicId, identity, createdBy;
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
              gifsCloud = _context.sent;
              secureUrl = gifsCloud.secure_url, createdOn = gifsCloud.created_at, publicId = gifsCloud.public_id;
              identity = (0, _identity["default"])(100000);
              createdBy = req.body.email;
              _context.next = 14;
              return regeneratorRuntime.awrap(_index["default"].query("INSERT INTO gifs (gifId, title, imageUrl, createdOn, publicId, createdBy) \n          VALUES ($1, $2, $3, $4, $5, $6)", [identity, title, secureUrl, createdOn, publicId, createdBy]));

            case 14:
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  gifId: identity,
                  message: 'gif image successfully posted.',
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
  }, {
    key: "getAllGifs",
    value: function getAllGifs(req, res) {
      var gifs;
      return regeneratorRuntime.async(function getAllGifs$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT * FROM gifs ORDER BY createdOn DESC'));

            case 2:
              gifs = _context2.sent;
              res.status(200).json({
                status: 'Success',
                data: gifs.rows
              });

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "getSingleGif",
    value: function getSingleGif(req, res) {
      var gifId, gif;
      return regeneratorRuntime.async(function getSingleGif$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              gifId = req.params.gifId;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_index["default"].query("SELECT * FROM gifs WHERE gifId = ".concat(gifId)));

            case 3:
              gif = _context3.sent;

              if (!(gif.rows.length === 0)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'gif with the specified gifId NOT found'
              }));

            case 6:
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                data: gif.rows[0]
              }));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "deleteGif",
    value: function deleteGif(req, res) {
      var gifId, gif;
      return regeneratorRuntime.async(function deleteGif$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              gifId = req.params.gifId;
              _context4.next = 3;
              return regeneratorRuntime.awrap(_index["default"].query("SELECT * FROM gifs WHERE gifId = ".concat(gifId)));

            case 3:
              gif = _context4.sent;

              if (!(gif.rows.length === 0)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'gif with the specified gifId NOT found'
              }));

            case 6:
              if (!(gif.rows[0].createdby !== req.user.email)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(403).json({
                status: 'error',
                message: 'You cannot delete this gif'
              }));

            case 8:
              _context4.next = 10;
              return regeneratorRuntime.awrap(_cloudinary["default"].v2.uploader.destroy(gif.rows[0].publicid));

            case 10:
              _context4.next = 12;
              return regeneratorRuntime.awrap(_index["default"].query("DELETE FROM gifs WHERE gifId = ".concat(gifId)));

            case 12:
              if (!(gif.rowCount === 0)) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                message: 'gif Not Found'
              }));

            case 14:
              return _context4.abrupt("return", res.status(202).json({
                status: 'success',
                data: {
                  message: 'gif deleted successfully'
                }
              }));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);
  return GifsController;
}();

module.exports = GifsController;