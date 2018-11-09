var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');

/* GET home page. */
router.get('', function(req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
  res.render('connectId', { 
    name: user.username,
    role: user.role,
    uniqueId: user.uniqueId,
    sprogmakker: user.role ==="Sprogmakker",
    tilknyttetKursist: user.tilknyttetKursist
   });
});
});

module.exports = router;
