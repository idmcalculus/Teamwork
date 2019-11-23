"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

module.exports = function () {
  var createUsersTable = function createUsersTable() {
    return regeneratorRuntime.async(function createUsersTable$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_index["default"].query("CREATE TABLE IF NOT EXISTS users (\n            userId serial PRIMARY KEY,\n            firstName VARCHAR (50) NOT NULL,\n            lastName VARCHAR (50) NOT NULL,\n            email VARCHAR (50) UNIQUE NOT NULL,\n            password VARCHAR (1024) NOT NULL,\n            gender VARCHAR (50) NOT NULL,\n            jobRole VARCHAR (50) NOT NULL,\n            department VARCHAR (50) NOT NULL,\n            address VARCHAR (50) NOT NULL,\n            isAdmin BOOLEAN )"));

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

  createUsersTable();
};