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

//Her er det nye

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
      gfs.files.find().toArray((err, files) => {

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
            admin: user.role === "Administrator"
          });
        }
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

          if (user.userPoints <= 90) {
            collection.update({ 'uniqueId': user.uniqueId },
              { '$set': { 'userPoints': 0 } });

            if (user.userRank == "Begynder") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Børnehaveklasse" } });
            }
            else if (user.userRank == "Børnehaveklasse") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Folkeskoleelev" } });
            }
            else if (user.userRank == "Folkeskoleelev") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Gymnasieelev" } });
            }
            else if (user.userRank == "Gymnasieelev") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Akademielev" } });
            }
            else if (user.userRank == "Akademielev") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Lærer" } });
            }
            else if (user.userRank == "Lærer") {
              collection.update({ 'uniqueId': user.uniqueId },
                { '$set': { 'userRank': "Ord-Jonglør" } });
            }
          }
        }
        asyncCall();
      });
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
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
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