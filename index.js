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

  const todos = db.collection('todos');
  const app = express();

  app.use(express.static('public'));
  app.use(json());

  app.get('/todos', (req, res) => {
    console.log('Fetching Todos')
    todos.find().toArray((err, docs) => {
      if (err) return res.sendStatus(500)
      res.send(docs);
    })
  })

  app.post('/todos', (req, res) => {
    console.log('Creating new task');
    todos.insert(req.body, (err, docs) => {
      if (err) return res.sendStatus(500)
      res.json(docs.ops[0])
    })
  })

  app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
  })
})
