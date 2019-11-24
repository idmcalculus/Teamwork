"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

module.exports = function () {
  var createGifsTable = function createGifsTable() {
    return regeneratorRuntime.async(function createGifsTable$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_index["default"].query("CREATE TABLE IF NOT EXISTS gifs (\n                    gifId serial PRIMARY KEY, \n                    title VARCHAR (50) NOT NULL,\n                    imageUrl VARCHAR (1024) NOT NULL,\n                    createdOn timestamp with time zone NOT NULL,\n                    publicId VARCHAR (1024) NOT NULL,\n                    createdBy VARCHAR (50) NOT NULL\n                )"));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  };

  createGifsTable();
};