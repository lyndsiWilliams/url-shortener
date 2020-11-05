// DB import
const db = require('./data/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  findBySlug,
  insert,
};

function find() {
  return db('urls').select('id', 'url', 'slug');
};

function findBy(filter) {
  return db('urls')
    .select('id', 'url', 'slug')
    .where(filter);
};

function findById(id) {
  return db('urls')
    .select('id', 'url')
    .where({ id })
    .first();
};

function findBySlug(slug) {
  return db('urls')
    .select('id', 'url', 'slug')
    .where({ slug })
    .first();
};

function insert(url) {
  return db('urls')
    .insert(url, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
};