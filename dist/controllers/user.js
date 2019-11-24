"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _identity = _interopRequireDefault(require("../models/database/identity"));

var _index = _interopRequireDefault(require("../models/database/index"));

var _userSignup = require("../models/validators/userSignup");

var _userLogin = require("../models/validators/userLogin");

require('../models/database/user')();

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "createUserAccount",
    value: function createUserAccount(req, res) {
      var _req$body, firstName, lastName, email, password, gender, jobRole, department, address, isAdmin, _validateSignup, error, identity, salt, hashedPassword, user, token;

      return regeneratorRuntime.async(function createUserAccount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, gender = _req$body.gender, jobRole = _req$body.jobRole, department = _req$body.department, address = _req$body.address, isAdmin = _req$body.isAdmin;
              _validateSignup = (0, _userSignup.validateSignup)(req.body), error = _validateSignup.error;

              if (!error) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: error.details[0].message
              }));

            case 4:
              identity = (0, _identity["default"])(1000000);
              _context.next = 7;
              return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

            case 7:
              salt = _context.sent;
              _context.next = 10;
              return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, salt));

            case 10:
              hashedPassword = _context.sent;
              _context.next = 13;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT * FROM users WHERE email=$1', [email]));

            case 13:
              user = _context.sent;

              if (!(user.rowCount > 0)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                data: {
                  message: 'User already registered'
                }
              }));

            case 16:
              _context.next = 18;
              return regeneratorRuntime.awrap(_index["default"].query("INSERT INTO users (userId, firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) \n        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [identity, firstName, lastName, email, hashedPassword, gender, jobRole, department, address, isAdmin]));

            case 18:
              user = _context.sent;
              token = _jsonwebtoken["default"].sign({
                userId: identity,
                isAdmin: isAdmin,
                email: email
              }, 'jwtPrivateKey');
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  message: 'User account successfully created',
                  token: token,
                  userId: identity
                }
              }));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var _validateLogin, error, _req$body2, email, password, user, validPassword, token;

      return regeneratorRuntime.async(function loginUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _validateLogin = (0, _userLogin.validateLogin)(req.body), error = _validateLogin.error;

              if (!error) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: error.details[0].message
              }));

            case 3:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.next = 6;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT * FROM users WHERE email = $1', [email]));

            case 6:
              user = _context2.sent;

              if (!(user.rows.length === 0)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(400).send('Invalid email or password'));

            case 9:
              _context2.next = 11;
              return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.rows[0].password));

            case 11:
              validPassword = _context2.sent;

              if (validPassword) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(400).send('Invalid email or password'));

            case 14:
              token = _jsonwebtoken["default"].sign({
                userId: user.rows[0].userId,
                isAdmin: user.rows[0].isAdmin,
                email: user.rows[0].email
              }, 'jwtPrivateKey');
              return _context2.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  token: token,
                  userId: user.rows[0].userId
                }
              }));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);
  return UserController;
}();

module.exports = UserController;