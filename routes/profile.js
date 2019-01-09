var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {

   // Hvis der allerede er en cookie som hedder userPoints, brug værdien fra den til deadline
  
  var cookie = req.cookies.userPoints;

  if (cookie === ('userPoints')) {
  // få deadline fra cookien
  
  console.log(req.cookies.userPoints);
  console.log(req.cookies);
  console.log(deadline);
}

// ellers, sæt en deadline fra nu og
// gem som cookie med givet navn
else {

  
  // Lave en deadline i 'x' minutter fra dette tidspunkt.
  var timeInMinutes = 1320;
  var currentTime = Date.parse(new Date());
  var deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
  expirationGMT = deadline.toGMTString();
  var rescookie = expirationGMT.replace(/%/g, " ");

  // Gem i deadline i en cookie
  res.cookie('userPoints', rescookie, {expires: deadline, domain: 'localhost', encode: String});
  console.log('Cookie created');
  console.log(rescookie)
  console.log(req.cookies.userPoints)
  console.log(req.cookies);
  //
  
} 

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
    ordJongloer: user.userRank === "Ord-Jonglør",
    cookieTest: rescookie
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