'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

// exports.up = (knex) => {
//   return knex.schema.createTable('books', (table) => {
//     table.increments();
//     table.string('title', 255).notNullable().defaultTo('');
//     table.string('author', 255).notNullable().defaultTo('');
//     table.string('genre', 255).notNullable().defaultTo('');
//     table.string('description').notNullable().defaultTo('');
//     table.string('cover_url').notNullable().defaultTo('');
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.timestamp('updated_at').defaultTo(knex.fn.now());
//   })
// };
//
// exports.down = (knex) => {
//   return knex.schema.dropTable('books');
// };

module.exports = knex;
