const express = require('express');
const mongoose = require('mongoose');
const Product = require('../model/product');

const router = express.Router();

router.get('/', (req, res, next) => {
  Product.find().exec()
    .then(doc => res.status(200).json(doc))
    .catch(error => res.status(500).json(error));
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(doc => res.status(200).json(doc))
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product.save()
    .then(result => {
      console.log(result);
    }).catch(err => console.log(err));
  res.status(200).json({
    message: 'Handling post requests from products',
    product: product
  });
});

router.post('/update', (req, res, next) => {
  Product.updateMany({ name: 'Harry', price: 32 },
    { $set: { name: 'Harry puttar', price: '50' } }).exec()
    .then(result => {
      console.log('update successful ' + result.length);
      res.status(200).json('Update succesful');
    })
    .catch(() => {
      console.log('error happened');
    });
});

module.exports = router;
