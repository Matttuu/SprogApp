var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
  res.render('connectID', { 
    name: user.username,
    role: user.role,
    uniqueId: user.uniqueId,
    sprogmakker: user.role ==="Sprogmakker",
    tilknyttetKursist: user.tilknyttetKursist
   });
}); 
});

router.post('/uploadID', (req, res, next) => {
  User.findById(req.session.userId)
  .exec(function (error, user) {

  mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi',{useNewUrlParser: true,}, function(err, db){
    if(err){throw err;}

    var collection = db.collection('users');
    collection.update({'uniqueId': user.uniqueId},
    {'$set': {'tilknyttetKursistID': req.body.kursistID}});
  });
});
   res.redirect('/connectId');
}); 


module.exports = router;
