const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/signup', (req, res, _next) => {
  User.find({ email: req.body.email })
    .then(result => {
      if (result.length >= 1) {
        return res.status(409).json({ message: 'Already registered' });
      } else {
        bcrypt.hash(req.body.email, 10, (_err, hash) => {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user.save()
            .then(_result => res.status(201).json(user))
            .catch(_err => res.status(501).json({ message: 'User creation failed' }));
        });
      }
    });
});

router.post('/login', (req, res, _next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({ message: 'Auth failed' });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: 'Auth failed' });
        }
        if (result) {
          return res.status(200).json({ message: 'Auth successful' });
        }
        console.log(req.body.email + ' ' + req.body.password);
        return res.status(401).json({ message: 'Auth failed' });
      });
    });
});

router.delete('/:userId', (req, res, _next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(_result => {
      res.status(200).json({ message: 'User deleted' });
    })
    .catch(_err => {
      res.status(500).json({ message: 'User not found' });
    });
});

module.exports = router;
