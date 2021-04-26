require('dotenv').config();
const express = require('express');

// define body parser
const bodyParser = require('body-parser');
// define database connection settings
const sequelize = require('./config/mysql_db');

// define routes
const adRoutes = require('./routes/ad-user');

// initialize express app
const app = express();

// test database connection
sequelize.authenticate()
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  })
  .then(() => {
    console.log('Connection has been established successfully.');
  });
// synchronize database
sequelize.sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  });

// add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/upload', express.static(path.join('backend/upload')));

// set http headers to avoid CORS messages
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

// add routes for AD manipulations
app.use('/api/domain', adRoutes);

module.exports = app;
