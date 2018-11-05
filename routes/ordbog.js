var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    User.findById(req.session.userId)
    .exec(function (error, user) {
  res.render('ordbog', { 
    name: user.username
   });
});
});
module.exports = router;