var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',  { 
    title: 'Express',
    layout: 'other',
    dagens_citat: "Skyd ikke bjørnen før noget er solgt."
   });
});

module.exports = router;
