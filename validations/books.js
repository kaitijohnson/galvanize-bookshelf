'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string().label('Title').required(),
    genre: Joi.string().label('Genre').required(),
    author: Joi.string().label('Author').required(),
    description: Joi.string().label('Description').max(2000).required(),
    cover_url: Joi.string().label('Cover URL').required()
  }
};
