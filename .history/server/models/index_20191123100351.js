import pg from 'pg';
import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let dbString = process.env.DB_URL;
let client = new pg.Client(dbString);

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