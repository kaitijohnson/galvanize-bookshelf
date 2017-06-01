'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const humps = require('humps');
const boom = require('boom');
const ev = require('express-validation');
const validations = require('../validations/token');
require('dotenv').config();

const router = express.Router();
const knex = require('../knex');

const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    if (!req.cookies.token) {
      res.status(200).send(false);
    } else {
      res.status(200).send(true);
    }
});

router.post('/', ev(validations.post), (req, res, next) => {
  if (!req.body.email) {
    return next(boom.create(400, 'Email must not be blank'));
  }
  if (!req.body.password) {
    return next(boom.create(400, 'Password must not be blank'));
  }
  knex('users')
    .where('email', req.body.email)
    .select('*')
    .then((user) => {
      if (user.length > 0)
      bcrypt.compare(req.body.password, user[0].hashed_password, function(err, boolean) {
        if (boolean) {
          let token = jwt.sign({email: user[0].email, password: user[0].hashed_password}, "secret")
          res.cookie('token', token, {httpOnly:true});
          delete user[0].hashed_password;
          res.send(humps.camelizeKeys(user[0]));
        }
        else {
          next(boom.create(400, 'Bad email or password'))
        }
      });
      else {
        next(boom.create(400, 'Bad email or password'))
      }
    })
});
router.delete('/', (req, res, next) => {
  res.clearCookie('token');
  res.status(200);
  res.send()

});

module.exports = router;
