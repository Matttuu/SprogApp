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
<<<<<<< HEAD
    sprogmakker: user.role === "Sprogmakker",
    tilknyttetKursistID: user.tilknyttetKursistID
=======
    sprogmakker: user.role ==="Sprogmakker",
>>>>>>> d0dd2cc74ebb46c4d291e4ee2b202f295c36ad03
   });
}); 
});

router.post('/uploadID', (req, res, next) => {
  User.findById(req.session.userId)
  .exec(function (error, user) {

  mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi',{useNewUrlParser: true,}, function(err, db){
    if(err){throw err;}

    var kursistID = req.body.kursistID;
    var k = 1;
    
    var collection = db.collection('users');
    
    var findID = collection.find({"uniqueId": kursistID}).limit(1);
    findID.count(function(error, antal){
      console.log(antal);
    
    if(antal === 1){
    collection.update({'uniqueId': user.uniqueId},
    {'$set': {'tilknyttetKursistID': kursistID}});
    }
    });
  });
});
   res.redirect('/connectId');
}); 

module.exports = router;
