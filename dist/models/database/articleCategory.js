"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

module.exports = function () {
  var createCategoriesTable = function createCategoriesTable() {
    return regeneratorRuntime.async(function createCategoriesTable$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_index["default"].query("CREATE TABLE IF NOT EXISTS categories (\n              categoryId serial PRIMARY KEY, \n              categoryName VARCHAR (50) UNIQUE NOT NULL)"));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  createCategoriesTable();
};