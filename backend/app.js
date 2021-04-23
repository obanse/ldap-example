require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const AdUser = require('./models/ad-user');

// initialize express app
const app = express();

// Testing database connection
sequelize.authenticate()
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  })
  .then(() => {
    console.log('Connection has been established successfully.');
  });

sequelize.sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  });

const user = AdUser.create({
  sAMAccountName: 'user_sAMAccountName'
}).then((user) => {
  console.log("something happened?");
  console.log("ID:: " + user.id);
});

app.use(bodyParser.json({ limit: '1mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use('/upload', express.static(path.join('backend/upload')));

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

const adRoutes = require('./routes/ad-user');

app.use('/api/domain', adRoutes);

module.exports = app;
