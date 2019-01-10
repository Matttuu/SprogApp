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
          ingenRang: user.userRank === "Ingen rang",
          bronze: user.userRank === "Bronze",
          sølv: user.userRank === "Sølv",
          guld: user.userRank === "Guld",
          platin: user.userRank === "Platin",
          diamant: user.userRank === "Diamant",
          ordJongloer: user.userRank === "Ord-Jonglør",
        });
        
      mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi', { useNewUrlParser: true, }, function (err, db) {
        if (err) { throw err; }
        var collection = db.collection('users');
        var d = new Date();
        var getDate = d.getDate();
        console.log(getDate);
        console.log(user.lastVisitDate);
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