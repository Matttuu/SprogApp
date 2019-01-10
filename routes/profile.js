var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');
var cookieParser = require('cookie-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
  res.render('profile', {    
    title: 'Dashboard',
    user: user,
    username: user.username,
    role: user.role,
    userPoints: user.userPoints,
    userRank: user.userRank,
    uniqueId: user.uniqueId,
    sprogmakker: user.role === "Sprogmakker",
    kursist: user.role === "Kursist",
    admin: user.role === "Administrator",
    bronze: user.userRank === "Bronze",
    silver: user.userRank === "Sølv",
    gold: user.userRank === "Guld",
    platin: user.userRank === "Platin",
    diamant: user.userRank === "Diamant",
    ordJongloer: user.userRank === "Ord-Jonglør",
   });
})
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;