var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, 
  },
  passwordConf: {
    type: String,
    required: true,
  },
  tilknyttetKursistID: {
    type: String,
  }
});

//Authenticate input i forhold til databasen
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('Brugeren blev ikke fundet.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//Hasher passwordet før den lagrer i databasen
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    user.passwordConf = hash;
    next();
  })
}); 

var User = mongoose.model('User', UserSchema);
module.exports = User;