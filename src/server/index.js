import db from './db';
import express from 'express';
import bodyParser from 'body-parser';

const DB_CONNECT = 'mongodb://localhost/hscards';

const app = express();
app.use(bodyParser.json());

db.connect(DB_CONNECT, (err) => {
  if (err)
    return console.log(err);

  // cards requires database connection to already be established
  var cards = require('./cards');

  // set up routes
  app.use('/api/cards', cards);

  app.listen(8080, function(err) {
    if (err)
      return console.log(err);
    console.log('running on localhost:8080');
  });
});