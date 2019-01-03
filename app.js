var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const crypto = require('crypto');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
var cons = require('consolidate');

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hesteRouter = require('./routes/heste');
var profileRouter = require('./routes/profile');
var billedbogRouter = require('./routes/billedbog');
var videobogRouter = require('./routes/videobog');
var loginRouter = require ('./routes/login');
var signupRouter = require ('./routes/signup');
var chatRouter = require ('./routes/chat');
var supportRouter = require('./routes/support');
var connectIdRouter = require('./routes/connectId');
var lydbogRouter = require('./routes/lydbog');

var app = express();

// Connect to MongoDB
mongoose.connect('mongodb://admin:team12@ds125693.mlab.com:25693/cdi',{useNewUrlParser: true,});
var db = mongoose.connection;

// Handle Mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // We're connected!
});

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Use sessions for tracking logins
app.use(session({
  secret: 'work hard',  
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/heste', hesteRouter);
app.use('/profile', profileRouter);
app.use('/billedbog', billedbogRouter);
app.use('/videobog', videobogRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/chat', chatRouter);
app.use('/support', supportRouter);
app.use('/connectId', connectIdRouter);
app.use('/lydbog', lydbogRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { layout: 'errorView2' });
});

module.exports = app;