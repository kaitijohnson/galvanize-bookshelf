'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
var knex = require('../knex');
var humps = require('humps');


//GET all books
router.get('/books', (req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((books) => {
      res.send(humps.camelizeKeys(books));
    });
});

//GET one book
router.get('/books/:id', (req, res, next) => {
  knex('books')
    .orderBy('title')
    .where('id', req.params.id)
    .then((books) => {
      res.send(humps.camelizeKeys(books[0]));
    });
});

//POST one book
router.post('/books', (req, res, next) => {
  let body = req.body;
  // title,author,genre,description,coverUrl
  // INSERT INTO books (title,author,genre,description,coverUrl) VALUES();
  //req.body
  knex('books')
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
    .insert({
      title: body.title,
      author: body.author,
      genre: body.genre,
      description: body.description,
      cover_url: body.coverUrl
    })
    .then((books) => {
      res.send(humps.camelizeKeys(books[0]));
    })
    // .done()
});

//UPDATE one book
router.patch('/books/:id', (req, res, next) => {
  let body = req.body;
  let id = req.params.id;
  knex('books')
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
    .where('id', id)
    .update({
      title: body.title,
      author: body.author,
      genre: body.genre,
      description: body.description,
      cover_url: body.coverUrl
    })
    .then((books) => {
      res.send(humps.camelizeKeys(books[0]));
    })
});

//DELETE one book
router.delete('/books/:id', (req, res, next) => {
  let id = req.params.id;
  knex('books')
    .where('id', id)
    .del()
    .then((books) => {
      res.sendStatus(humps.camelizeKeys(books));
    })
})

module.exports = router;
