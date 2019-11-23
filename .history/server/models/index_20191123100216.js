import pg from 'pg';
import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

var conString = process.env.DB_URL;
var client = new pg.Client(conString);
client.connect(function(err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Database Connected");
  });
});

module.exports = client;