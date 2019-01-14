var express = require('express');
var router = express.Router();
var User = require('../public/javascripts/user');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// Mongo URI
const mongoURI = 'mongodb://admin:team12@ds125693.mlab.com:25693/cdi';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('imageuploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        User.findById(req.session.userId)
          .exec(function (error, user) {
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const metadata = user.uniqueId;
            const fileInfo = {
              filename: filename,
              metadata: metadata,
              bucketName: 'imageuploads'
            };
            resolve(fileInfo);
          });
      });
    });
  }
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
router.get('/', (req, res) => {
  User.findById(req.session.userId)
    .exec(function (error, user) {

      mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi', { useNewUrlParser: true, }, function (err, db) {
        if (err) { throw err; }

        var collection = db.collection('users');

        collection.findOne({ uniqueId: user.tilknyttetKursistID1 }, function (err, result) {
          if (err) throw err;
          var obj1 = {};
          obj1.users = result;
          collection.findOne({ uniqueId: user.tilknyttetKursistID2 }, function (err, result) {
            if (err) throw err;
            var obj2 = {};
            obj2.users = result;
            collection.findOne({ uniqueId: user.tilknyttetKursistID3 }, function (err, result) {
              if (err) throw err;
              var obj3 = {};
              obj3.users = result;
              collection.findOne({ uniqueId: user.tilknyttetKursistID4 }, function (err, result) {
                if (err) throw err;
                var obj4 = {};
                obj4.users = result;
                collection.findOne({ uniqueId: user.tilknyttetKursistID5 }, function (err, result) {
                  if (err) throw err;
                  var obj5 = {};
                  obj5.users = result;

                  gfs.files.find().toArray((err, files) => {
                    // gfsLyd.files.find().toArray((err, filesLyd) => {
                    // Check if files
                    if (!files || files.length === 0) {
                      res.render('billedbog', { files: false });
                    } else {
                      res.render('billedbog', {
                        user: user,
                        uniqueId: user.uniqueId,
                        files: files,
                        title: 'Billedordbog',
                        sprogmakker: user.role === "Sprogmakker",
                        kursist: user.role === "Kursist",
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
                        obj1,
                        obj2,
                        obj3,
                        obj4,
                        obj5
                      });
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
});

// @route POST /upload
// @desc  Uploads file to DB
//Her uploader vi billedet og samtidig smider 10 point ind til brugeren
router.post('/upload', upload.single('file'), (req, res) => {

  User.findById(req.session.userId)
    .exec(function (error, user) {

      mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi', { useNewUrlParser: true, }, function (err, db) {
        if (err) { throw err; }

        function resolveDetteBagefter() {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(res.redirect('/billedbog'));
            }, 0001);
          });
        }
        async function asyncCall() {
          await resolveDetteBagefter();
          var collection = db.collection('users');

          //Tilføjer 10 point til brugeren
          collection.update({ 'uniqueId': user.uniqueId },
            { '$inc': { 'userPoints': 10 } });

          if (user.userPoints >= 90 && user.userRank != "Ord-Jonglør") {
            collection.update({ 'uniqueId': user.uniqueId },
              { '$set': { 'userPoints': 0 } });

            if (user.userRank == "Ingen rang") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Bronze" } });
            }
            else if (user.userRank == "Bronze") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Sølv" } });
            }
            else if (user.userRank == "Sølv") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Guld" } });
            }
            else if (user.userRank == "Guld") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Platin" } });
            }
            else if (user.userRank == "Platin") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Diamant" } });
            }
            else if (user.userRank == "Diamant") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Ord-Jonglør" } });
            }
          }
        }
        asyncCall();
      });
    });
});

router.post('/audiouploadLink/files/:filename', (req, res, next) => {

  // Connect til database
  mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi', { useNewUrlParser: true, }, function (err, db) {
    if (err) { throw err; }

    // Opretter nyt promise som bliver kørt senere i koden.
    function resolveDetteBagefter() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res.redirect('/billedbog'));
        }, 0001);
      });
    }
    // Opretter async funktion 
    async function asyncCall() {
      var result = await resolveDetteBagefter();
      // Peger på database collection 
      var collection = db.collection('imageuploads.files')
      // Bruger collection.update metoden for at opdatere / give text til specifik lyd
      collection.update(
        { filename: req.params.filename },
        { '$set': { 'audioLink': req.body.audioLink } }
      )
    }
    asyncCall();
  });
});

// Her lagrees beskrivelse til billedet i databasen. 
// Det bliver lagret til det specifikke filnavn.
/* Der bliver benyttet en async / await funktion for at
   sørge for koden bliver kørt asynkront. Dette resultere
   i at teksten bliver opdateret når den bliver sat ind
   med det samme.
*/
router.post('/files/:filename', (req, res, next) => {

  // Connect til database
  mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi', { useNewUrlParser: true, }, function (err, db) {
    if (err) { throw err; }

    // Oprette nyt promise som bliver kørt senere i koden.
    function resolveDetteBagefter() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res.redirect('/billedbog'));
        }, 0001);
      });
    }
    // Opretter async funktion 
    async function asyncCall() {
      var result = await resolveDetteBagefter();
      // Peger på database collection 
      var collection = db.collection('imageuploads.files')
      // Bruger collection.update metoden for at opdatere / give text til specifikt billede
      collection.update(
        { filename: req.params.filename },
        { '$set': { 'billedDescription': req.body.billedDescription } }
      )
    }
    asyncCall();
  });
});

// @route GET /files
// @desc  Display all files in JSON
router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    User.findById(req.session.userId)
      .exec(function (error, user) {

        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg' || file.contentType === 'image/mp3' || file.contentType === 'image/mp4' || file.contentType === 'image/mov' || file.contentType === 'image/mpeg-4' || file.contentType === 'image/x-m4a' || file.contentType === 'image/m4a' || file.contentType === 'image/amr' || file.contentType === 'image/wav' || file.contentType === 'image/quicktime') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          file = false;
        }
      });
  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'imageuploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.redirect('/billedbog');
  });
});

module.exports = router;