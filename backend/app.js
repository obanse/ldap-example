require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

const adRoutes = require('./routes/ldap');

app.use('/api/ad', adRoutes);

module.exports = app;
