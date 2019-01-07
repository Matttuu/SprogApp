var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');

// GET route for reading data
router.get('/', function (req, res, next) {
  res.render('login.hbs',{
    title: 'Log ind',
    layout: 'other',
  });
});

//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Kodeordene er ikke ens.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }
  
/* req.body indeholder værdierne (key-value pairs) som er  
   indtastet i registrerings formen.*/
  if (req.body.uniqueId &&
    req.body.email &&
    req.body.username &&
    req.body.role &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      uniqueId: req.body.uniqueId,
      email: req.body.email,
      username: req.body.username,
      role: req.body.role,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.render('profile',{
          uniqueId: user.uniqueId,
          name: user.username,
          email: user.email,
          role: user.role
        });
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Forkert e-mail eller kodeord.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');

      }
    });
  } else {
    var err = new Error('Alle felter skal udfyldes!');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Ikke autoriseret. Gå tilbage!');
          err.status = 400;
          return next(err);
        } else {
          return res.redirect('/profile');
          //return res.send('<h1>Name:</h1>' + user.username + '<h2>ID:</h2>' + user.uniqueId + '<h2>Mail:</h2>' + user.email + '<h2>Rolle:</h2>' +user.role + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
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