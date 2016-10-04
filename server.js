//Express
var express = require('express');
var app = express();

//Models
var User = require('./models/user');
var Clothing = require('./models/clothing');

//Debugging
var logger = require('morgan');
app.use(logger('dev'));

//Handle forms
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//Handlebars
var hbs = require('hbs');
app.set('view engine', 'hbs');
require('handlebars-form-helpers').register(hbs.handlebars);

//Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/closet');
var db = mongoose.connection;
db.on('error', function(err) {
  console.log(err);
})
db.once('open', function() {
  console.log('database connected!');
})

//Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

app.configure(function() {
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
});

app.use(require('express-session')({
  secret: 'michigan',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Controllers
var userController = require('./controllers/index');
var clothingController = require('./controllers/closet');

//Routing
app.use('/', userController);
app.use('/closet', clothingController);

app.listen(4000);
