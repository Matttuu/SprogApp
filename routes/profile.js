var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {

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
        noRank: user.userRank === "Ingen rang",
        bronze: user.userRank === "Bronze",
        silver: user.userRank === "Sølv",
        gold: user.userRank === "Guld",
        platinum: user.userRank === "Platin",
        diamond: user.userRank === "Diamant",
        ordJongloer: user.userRank === "Ord-Jonglør",
      });
      mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi', { useNewUrlParser: true, }, function (err, db) {
    if (err) { throw err; }
    var collection = db.collection('users');
    var d = new Date();
    var getDate = d.getDate();
    console.log(getDate)
    /*Tjekker hvornår brugeren sidst har været logget ind.
      Hvis ikke man har været logget ind i dag så får man 10 point,
      og værdien for sidste besøg bliver opdateret.*/
    if (user.lastVisitDate != getDate) {
      collection.update({ 'uniqueId': user.uniqueId },
        { '$set': { 'lastVisitDate': getDate } });
      collection.update({ 'uniqueId': user.uniqueId },
        { '$inc': { 'userPoints': 10 } });
    }
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