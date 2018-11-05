var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile', { 
   });
});

  
  router.get('/', function(req, res, next) {
   res.render('ordbog',{
   });
});


module.exports = router;
