'use strict'

const { Router } = require('express')
const router = Router()
router.use(require('./shows'))

router.get('/', function (req, res){
  res.json({
    "shows": "https://api-demo-ashley-irwin.herokuapp.com/api/v1/shows",
    "favorites": "https://api-demo-ashley-irwin.herokuapp.com/api/v1/shows/favorites?showId=<show_id>",
    "directors": "https://api-demo-ashley-irwin.herokuapp.com/api/v1/directors?showId=<show_id>"
  })
})

module.exports= router
