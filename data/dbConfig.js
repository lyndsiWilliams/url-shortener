// Package imports
const knex = require('knex');
const knexfile = require('../knexfile.js');
// Dynamic environment
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(knexfile[environment]);