const express = require('express');
const { json } = require('body-parser');
const { MongoClient } = require('mongodb');


const MONGO_URI = 'mongodb://localhost:27017/todos'
const PORT = 3000;

MongoClient.connect(MONGO_URI, (err, db) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const app = express();

  app.use(express.static('public'));
  app.use(json());

  app.get('/todos', (req, res) => {
    console.log('Fetching Todos')
    db.collection('todos').find().toArray((err, docs) => {
      if (err) return console.log(err)
      res.send(docs);
    })
  })
  app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
  })
})
