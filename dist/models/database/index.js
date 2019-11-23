"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var dbString = process.env.DB_URL;
var client = new _pg["default"].Client(dbString);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }

  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }

    console.log("Database Connected");
    console.log(result.rows[0].theTime);
    client.end();
  });
});
module.exports = client;