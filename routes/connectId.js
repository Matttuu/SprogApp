var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
  res.render('connectID', { 
    name: user.username,
    role: user.role,
    uniqueId: user.uniqueId,
    sprogmakker: user.role === "Sprogmakker",
    admin: user.role === "Administrator",
    tilknyttetKursistID: user.tilknyttetKursistID
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

          //var findName = collection.find({"username": {"uniqueId": "wxkr788n5uc"}});
          /*
          var query = {"username": {"uniqueId": "wxkr788n5uc"}};
          collection.find(query).toArray(function(err, result){
            if(err) throw err;
            console.log(result);
            db.close();
          });
*/
          findID.count(function (error, antal) {

            if (antal === 1) {
              alert("Test");
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'tilknyttetKursistID': kursistID } });
            }
          });
        }
        asyncCall();
      });
    });
});
module.exports = router;
