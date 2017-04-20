
exports.up = (knex, Promise) => {
  return knex.schema.createTable('shows', (table) => {
    table.increments()
    table.string('name').notNullable().unique()
    table.string('channel').notNullable()
    table.string('genre').notNullable()
    table.boolean('inProduction').notNullable()
  })
  .createTable('favorites', (table) => {
    table.increments()
    table.timestamp('dataAdded').notNullable().defaultTo(knex.fn.now())
    table.integer('show_id').unsigned().references('shows.id')
  })
  .createTable('directors', (table) => {
    table.increments()
    table.string('name').notNullable().unique()
    table.string('gender').notNullable()
    table.integer('birthYear')
    table.string('twitterHandle')
  })
  .createTable('shows_directors', (table) => { // creating join table for show directors
    table.increments() // each input of a director and show gets a unqiue primary id
    table.integer('director_id').unsigned().references('directors.id') // defining foreign key
    table.integer('show_id').unsigned().references('shows.id') // defining foreign key
  })
};

exports.down = (knex, Promise) =>
  knex.schema
  .dropTable('shows_directors')
  .dropTable('favorites')
  .dropTable('directors')
  .dropTable('shows')
