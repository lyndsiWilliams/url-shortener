// Package imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');   // logger
const helmet = require('helmet');   // security

// Create Express server and port
const app = express();
const port = process.env.PORT || 1337;

// Middleware
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('../url-shortener/public')) // Replace this later with React app functionality

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'mymin.now.sh - Turn your big fish URL into a tiny minnow!'
  });
});

// app.get('/url/:id', (req, res) => {
//   //TODO: Retrieve info about short URL
// });

// app.get('/:id', (req, res) => {
//   //TODO: Redirect to URL
// });

// app.post('/url', (req, res) => {
//   //TODO: Create a short URL
// });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});