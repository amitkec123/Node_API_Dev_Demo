const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/product');
const userRoutes = require('./api/routes/user');

const app = express();

app.use(bodyParser.urlencoded({ urlencoded: false }));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/user', userRoutes);

mongoose.connect('*** your token ***');

app.use((req, res, next) => {
  res.status(200).json({
    message: 'It works'
  });
});

module.exports = app;
