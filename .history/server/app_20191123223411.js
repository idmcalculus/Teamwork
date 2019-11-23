import "@babel/polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import users from './routes/user';
import articles from './routes/articles';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/v1', users);
app.use('/api/v1', articles);
app.use('/api/v1', categories);

module.exports = app;