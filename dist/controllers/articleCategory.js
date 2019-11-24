"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../models/database/index"));

var _identity = _interopRequireDefault(require("../models/database/identity"));

var _articleCategory = require("../models/validators/articleCategory");

require('../models/database/articleCategory')();

var CategoryController =
/*#__PURE__*/
function () {
  function CategoryController() {
    (0, _classCallCheck2["default"])(this, CategoryController);
  }

  (0, _createClass2["default"])(CategoryController, null, [{
    key: "getAllCategories",
    value: function getAllCategories(req, res) {
      var categories;
      return regeneratorRuntime.async(function getAllCategories$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT * FROM categories'));

            case 2:
              categories = _context.sent;
              res.status(200).json({
                status: 'Success',
                data: categories.rows
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getSingleCategory",
    value: function getSingleCategory(req, res) {
      var categoryId, category;
      return regeneratorRuntime.async(function getSingleCategory$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              categoryId = req.params.id;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_index["default"].query("SELECT * FROM categories WHERE categoryId = ".concat(categoryId)));

            case 3:
              category = _context2.sent;

              if (!(category.rows.length === 0)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'Category with the specified categoryId NOT found'
              }));

            case 6:
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: category.rows[0]
              }));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "createSingleCategory",
    value: function createSingleCategory(req, res) {
      var _validate, error, categoryName, category, categoryId;

      return regeneratorRuntime.async(function createSingleCategory$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _validate = (0, _articleCategory.validate)(req.body), error = _validate.error;

              if (!error) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: error.details[0].message
              }));

            case 3:
              categoryName = req.body.categoryName;
              _context3.next = 6;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT * FROM categories WHERE categoryName=$1', [categoryName]));

            case 6:
              category = _context3.sent;

              if (!(category.rowCount > 0)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                data: {
                  message: 'Category already exists'
                }
              }));

            case 9:
              categoryId = (0, _identity["default"])(3532);
              _context3.next = 12;
              return regeneratorRuntime.awrap(_index["default"].query("INSERT INTO categories (categoryId, categoryName) \n              VALUES ($1, $2)", [categoryId, categoryName]));

            case 12:
              return _context3.abrupt("return", res.status(201).json({
                status: 'success',
                categoryId: categoryId,
                message: 'Category Successfully created'
              }));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "updateSingleCategory",
    value: function updateSingleCategory(req, res) {
      var _validate2, error, categoryId, categoryName, category;

      return regeneratorRuntime.async(function updateSingleCategory$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _validate2 = (0, _articleCategory.validate)(req.body), error = _validate2.error;

              if (!error) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                message: error.details[0].message
              }));

            case 3:
              categoryId = req.params.id;
              categoryName = req.body.categoryName;
              _context4.next = 7;
              return regeneratorRuntime.awrap(_index["default"].query("UPDATE categories\n              SET categoryName = $1\n              WHERE categoryId = ".concat(categoryId, " "), [categoryName]));

            case 7:
              category = _context4.sent;

              if (!(category.rowCount === 0)) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                message: 'Category Not Found'
              }));

            case 10:
              return _context4.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Category successfully updated'
              }));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "deleteSingleCategory",
    value: function deleteSingleCategory(req, res) {
      var categoryId, category;
      return regeneratorRuntime.async(function deleteSingleCategory$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              categoryId = req.params.id;
              _context5.next = 3;
              return regeneratorRuntime.awrap(_index["default"].query("DELETE FROM categories WHERE categoryId = ".concat(categoryId)));

            case 3:
              category = _context5.sent;

              if (!(category.rowCount === 0)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                message: 'Category Not Found'
              }));

            case 6:
              return _context5.abrupt("return", res.status(202).json({
                status: 'success',
                message: 'Category successfully deleted'
              }));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }]);
  return CategoryController;
}();

module.exports = CategoryController;