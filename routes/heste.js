var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('heste', { 
    navn: 'Pøllehest',
    alder: '8'
   });
});

module.exports = router;
