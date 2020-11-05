
exports.up = function(knex) {
  return knex.schema.createTable('urls', urls => {
    urls.increments();

    urls
      .string('url')
      .notNullable();

    urls.string('slug').unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('urls');
};
