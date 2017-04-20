'use strict'

const { bookshelf } = require('../db/database')
require('./show')
require('./show_director')

const Director = bookshelf.Model.extend({
  tableName: 'directors', // goes in square brackets in showCtrl during the .fetch
  shows: function() { return this.belongsToMany('Show').through('Show_Director')} // defining relationship between tables and ids
}, {
  getAll: function() {
    console.log("Get all called from Director Model");
    return this.forge()
    .fetchAll()
    .then( (rows) => {
      return rows
    })
    .catch( (error) => {
      return error
  })
  }
});


module.exports = bookshelf.model('Director', Director)
