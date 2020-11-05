// Package imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');   // logger
const helmet = require('helmet');   // security
const yup = require('yup');         // validation
const { nanoid } = require('nanoid');   // unique string ID generator

// Create Express server and port
const app = express();
const port = process.env.PORT || 1337;

// DB Model
const URLS = require('./urls-model.js');

// Middleware
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('../url-shortener/public')) // Replace this later with React app functionality

// Routes
app.get('/', (req, res) => {
  // "Server is awake" endpoint
  res.json({
    message: 'mymin.now.sh - Turn your big fish URL into a tiny minnow!'
  });
});

app.get('/:id', async (req, res) => {
  // Redirect to URL
  const { id: slug } = req.params;

  try {
    const url = await URLS.findBySlug(slug);
    console.log("URL: ", url)  

    if (url) {
      res.redirect(url.url);
    }
  } catch (error) {
    res.json({ message: "Redirect not successful" })
  }
});

const schema = yup.object().shape({
  // Slug will have no whitespace and will only allow alphanumeric characters and -
  slug: yup.string().trim().matches(/[\w\-]/i),
  url: yup.string().trim().url().required()
})

app.post('/url', async (req, res, next) => {
  // Creates a short URL
  let { slug, url } = req.body;

  try {
    await schema.validate({
      slug,
      url,
    });

    if (!slug){
      slug = nanoid(5);
    };

    slug = slug.toLowerCase();

    const newUrl = {
      url,
      slug,
    };
    const created = await URLS.insert(newUrl);
    const newSlug = newUrl.slug;
    res.json({created, newSlug})
  } catch (error) {
    res.status(500).json({ message: 'Slug in use 🐌', error: error })
  }
});

`Error handler:
  - if there's an error.status, set it to the res.status
    - Otherwise, set the status to 500
  - respond with the error's message and stack trace`
app.use((error, req, res, next) => {
  if(error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});