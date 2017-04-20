'use strict'

const { bookshelf } = require('../db/database')
const Show = require('../models/show')
const Director = require('../models/director')

module.exports.getShows = (req, res, next) => {
  Show.getAll()
  .then( (shows) => {
    res.status(200).json(shows);
  })
  .catch( (error) => {
    next(error);
  });
};

module.exports.getShow = ({params: {id}}, res, next) => {
  Show.getSingleShow(id)
  .then( (show) => {
    res.status(200).json(show)
  })
  .catch( (error) => {
    next(error);
  });
};

module.exports.addShow = ({body}, res, next) => {
  Show.forge(body)
  .save()
  .then( () => res.status(201).json({"msg": "Nice POST"}))
  .catch( (error) => {
    next(err)
  })
}

module.exports.deleteShow = ({params: {id}}, res, next) => {
  Show.forge({id})
  .destroy()
  .then( (show) => {
    res.status(202).json(show)
  })
  .catch( (err) => {
    next(err)
  })
}


module.exports.getShowFaves = ({query: {showId}}, res, next) => {
  console.log('the query string', showId)
  Show.forge({id: showId}) // grab show and the favoirites assoiciated with that showId
  .fetch({withRelated: ['upvotes'], require: true})
  .then( (faves) => {
    res.status(200).json(faves)
  })
  .catch( (err) => {
    next(err)
  })
}


module.exports.getShowDirectors = ({query: {showId}}, res, next) => { // writing a query to get directors by showId
  console.log('getting a show and directors', showId)
  Show.forge({id: showId}) // grab showId and get the directors
  .fetch({withRelated: ['directors'], require: true}) // require: true forces bookshelf to throw and error if ID doesn't exist
  .then( (showdirex) => {
    res.status(200).json(showdirex)
  })
  .catch( (err) => {
    next(err)
  })
}

// get query to get back all directors
module.exports.getAllDirex = (req, res, next) => {
  Director.getAll()
  .then( (directors) => {
    res.status(200).json(directors);
  })
  .catch( (error) => {
    next(error);
  });
};

// get query to get back all shows by director
module.exports.getDirexShows = ({query: {directorId}}, res, next) => {  // writing a query to get shows by director
  console.log('getting director and their shows', directorId)
  Director.forge({id: directorId})
  .fetch({withRelated: ['shows'], require: true})
  .then( (direxshows) => {
    res.status(200).json(direxshows)
  })
  .catch( (err) => {
    next(err)
  })
}
