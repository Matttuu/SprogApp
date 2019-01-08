var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {

  /* // Hvis der allerede er en cookie som hedder userPoints, brug værdien fra den til deadline
  
  var cookie = req.cookies.name;

  if (cookie &&  cookie === ('userPoints')) {
  // få deadline fra cookien
  var deadline = cookie.match(/(^|;)userPoints=([^;]+)/)[2];
 
  console.log('Cookie not create');
}

// ellers, sæt en deadline fra nu og
// gem som cookie med givet navn
else {

  
  // Lave en deadline i 'x' minutter fra dette tidspunkt.
  var timeInMinutes = 1320;
  var currentTime = Date.parse(new Date());
  var deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
  expirationGMT = deadline.toGMTString();

  // Gem i deadline i en cookie
  res.cookie('userPoints', deadline, {expires: deadline, domain: 'localhost'});
  console.log('Cookie created');
  console.log(expirationGMT);
  console.log(deadline);
  
} */

  User.findById(req.session.userId)
  .exec(function (error, user) {
  res.render('profile', {    
    title: 'Dashboard',
    username: user.username,
    role: user.role,
    userPoints: user.userPoints,
    userRank: user.userRank,
    uniqueId: user.uniqueId,
    sprogmakker: user.role === "Sprogmakker",
    kursist: user.role === "Kursist",
    admin: user.role === "Administrator",
    ordJungloer: user.userRank === "Ord-Junglør"
   });
})

app.use(function (req , res, next) {
  var cookie = req.cookies.userPoints;

  if (cookie && cookie.match('userPoints')) {
  // få deadline fra cookien
  var deadline = cookie.match(/(^|;)userPoints=([^;]+)/)[2];
  res.cookie('userPoints', deadline, {expires: expirationGMT, domain: 'localhost'});
  console.log('Cookie not create');
}

// ellers, sæt en deadline fra nu og
// gem som cookie med givet navn
else {

  
  // Lave en deadline i 'x' minutter fra dette tidspunkt.
  var timeInMinutes = 1320;
  var currentTime = Date.parse(new Date());
  var deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
  expirationGMT = deadline.toGMTString();

  // Gem i deadline i en cookie
  res.cookie('userPoints', deadline, {expires: expirationGMT, domain: 'localhost'});
  res.send('');
  console.log('Cookie created');
  
}
next();
});
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