const express = require('express');
const cors = require('cors');

const app = express();

const allowedDomains = ['*'];

// Middleware setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET, POST, PUT, DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true // Allow credentials (cookies, etc.)
  })
);

app.use(express.json());
app.use(express.urlencoded());

//import router

const router = require('./routes');
app.use('/api', router);

module.exports = app;
