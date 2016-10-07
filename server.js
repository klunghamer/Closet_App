//Express
var express = require('express');
var app = express();

//AWS
require('dotenv').config();
var AWS = require('aws-sdk');

//Express fileupload
var fileUpload = require('express-fileupload');

//Models
var User = require('./models/user');
var Clothing = require('./models/clothing');

//Debugging
var logger = require('morgan');
app.use(logger('dev'));

//multer
var multer = require('multer');
var multerS3 = require('multer-s3');

//Handle forms
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//Handlebars
var hbs = require('hbs');
app.set('view engine', 'hbs');
require('handlebars-form-helpers').register(hbs.handlebars);

//Custom handlebars
hbs.registerHelper('checkCategory', function (index, type, options) {
  if(index == type){
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

//Static Assets
app.use(express.static(__dirname + '/public'));

//Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/closet');
var db = mongoose.connection;
db.on('error', function(err) {
  console.log(err);
})
db.once('open', function() {
  console.log('database connected!');
})

//Config heroku
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/closet';
mongoose.connect(mongoURI);


//Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

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

app.use(fileUpload());
app.engine('html', require('ejs').renderFile);

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID , secretAccessKey: process.env.AWS_SECRET_KEY  });
AWS.config.region = 'us-standard';


//Controllers
var userController = require('./controllers/index');
var clothingController = require('./controllers/closet');

//Routing
app.use('/', userController);
app.use('/closet', clothingController);

app.listen(process.env.PORT || 3000);
