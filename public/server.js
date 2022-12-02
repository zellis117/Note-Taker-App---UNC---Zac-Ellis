const express = require('express');
const path = require('path');
const db = require('../db/db.json');
const router = express.Router();

const fs = require('fs'); //Needed to write to file

const PORT = (process.env.PORT || 3001);
const app = express();

//Middleware
app.use(express.json());
app.use('/', router);
app.use(express.urlencoded({ extended: true }));

//Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

//Route for notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/notes.html'))
);

//Returns db.json
app.get('/api/notes', (req, res) => res.json(db));
//Posts to db.json
app.post('/api/notes', (req, res) => 
fs.appendFile( '../db/db.json', JSON.stringify(req.body), (err) =>console.log('error'))
);

//Index.js get
app.get('/assets/js/index.js', (req, res) =>
  res.sendFile(path.join(__dirname, '/assets/js/index.js'))
);

//Styles.css get
app.get('/assets/css/styles.css', (req, res) =>
  res.sendFile(path.join(__dirname, '/assets/css/styles.css'))
);

//Listener for local port 3001
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
