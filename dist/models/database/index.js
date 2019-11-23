"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = _interopRequireDefault(require("pg"));

_dotenv["default"].config();

var conString = process.env.DB_URL;
var client = new _pg["default"].Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }

  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }

    console.log("Database Connected");
  });
});
module.exports = client;