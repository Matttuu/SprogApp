var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');

// GET route for reading data
router.get('/', function (req, res, next) {
    res.render('signup',{
      layout: 'other',
    });
  });

  module.exports = router;
