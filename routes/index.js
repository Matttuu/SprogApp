var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', {
    title: 'Velkommen til CDI\'s sprog-app',
    layout: 'other',
  });
});

module.exports = router;