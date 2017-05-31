'use strict';

const express = require('express');
const knex = require('../knex');
const humps = require('humps');
const boom = require('boom');
const bcrypt = require('bcrypt');
const ev = require('express-validation');
const validations = require('../validations/users');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', ev(validations.post), (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('users')
        .insert({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      res.send(humps.camelizeKeys(user));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
