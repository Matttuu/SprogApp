var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {

  User.findById(req.session.userId)
    .exec(function (error, user) {
<<<<<<< HEAD
      res.render('connectId', {
=======

      mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi', { useNewUrlParser: true, }, function (err, db) {
       if (err) { throw err; }
     
        var collection = db.collection('users');
        var kursistID = req.body.kursistID;
        var lagretKursistID1 = req.body.lagretKursistID1;
        var lagretKursistID2 = req.body.lagretKursistID2;


        /*
        collection.findOne({"uniqueId": ""}, {projection:{"username": 1, "_id": 0}}, function(err, doc, name) {
          console.log(doc);
       // name = doc.username;
   */
      res.render('connectID', {
       // findName1: doc.username,
        //findName2:doc.tilknyttetKursistID2,
>>>>>>> 36594eab3697c9509dfbea9bd120312c786c43c8
        name: user.username,
        role: user.role,
        uniqueId: user.uniqueId,
        sprogmakker: user.role === "Sprogmakker",
        admin: user.role === "Administrator",
        tilknyttetKursistID1: user.tilknyttetKursistID1,
        tilknyttetKursistID2: user.tilknyttetKursistID2,
        tilknyttetKursistID3: user.tilknyttetKursistID3,
        tilknyttetKursistID4: user.tilknyttetKursistID4,
        tilknyttetKursistID5: user.tilknyttetKursistID5,
        antalTilknyttedeKursister: user.antalTilknyttedeKursister,
        antalTilknyttedeKursister1: user.antalTilknyttedeKursister >= 1,
        antalTilknyttedeKursister2: user.antalTilknyttedeKursister >= 2,
        antalTilknyttedeKursister3: user.antalTilknyttedeKursister >= 3,
        antalTilknyttedeKursister4: user.antalTilknyttedeKursister >= 4,
        antalTilknyttedeKursister5: user.antalTilknyttedeKursister >= 5,
      
   //   });
    
      });
    
    });
});
});
router.post('/uploadID', (req, res, next) => {
  User.findById(req.session.userId)
    .exec(function (error, user) {

      mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi', { useNewUrlParser: true, }, function (err, db) {
        if (err) { throw err; }

        function resolveDetteBagefter() {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(res.redirect('/connectId'));
            }, 0001);
          });
        }
        async function asyncCall() {
          var result = await resolveDetteBagefter();
          var kursistID = req.body.kursistID;

          var collection = db.collection('users');

          var findID = collection.find({ "uniqueId": kursistID });

          findID.count(function (error, antal) {
            if (antal === 1) {
              console.log('Kursist tilknyttet sprogmakker.');
              console.log(user.antalTilknyttedeKursister);
              if (user.antalTilknyttedeKursister === undefined) {
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$set': { 'tilknyttetKursistID1': kursistID } });
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$set': { 'antalTilknyttedeKursister': 1 } });
              }
              else if (user.antalTilknyttedeKursister == 1) {
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$set': { "tilknyttetKursistID2": kursistID } });
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$inc': { 'antalTilknyttedeKursister': +1 } });
              }
              else if (user.antalTilknyttedeKursister == 2) {
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$set': { "tilknyttetKursistID3": kursistID } });
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$inc': { 'antalTilknyttedeKursister': +1 } });
              }
              else if (user.antalTilknyttedeKursister == 3) {
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$set': { "tilknyttetKursistID4": kursistID } });
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$inc': { 'antalTilknyttedeKursister': +1 } });
              }
              else if (user.antalTilknyttedeKursister == 4) {
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$set': { "tilknyttetKursistID5": kursistID } });
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$inc': { 'antalTilknyttedeKursister': +1 } });
              }
              else if (user.antalTilknyttedeKursister == 5) {
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$set': { "tilknyttetKursistID6": kursistID } });
                collection.update({ 'uniqueId': user.uniqueId },
                  { '$inc': { 'antalTilknyttedeKursister': +1 } });
              }
            }

          });
        }
        asyncCall();
      });
    });
});
module.exports = router;
