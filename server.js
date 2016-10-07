//Express
var express = require('express');
var app = express();

//Models
var User = require('./models/user');
var Clothing = require('./models/clothing');

//Debugging
var logger = require('morgan');
app.use(logger('dev'));

//AWS
require('dotenv').config();
var AWS = require('aws-sdk');

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
// var cookieParser = require('cookie-parser');
// var session = require('express-session');

// app.use(cookieParser('michigan'));
// app.use(session({ cookie: { maxAge: 60000 }}));
// app.use(flash());

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


AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID , secretAccessKey: process.env.AWS_SECRET_KEY  });
AWS.config.region = 'us-standard';
app.post('/addImage', function (req, res) {
    var s3 = new AWS.S3();
    var params = {Bucket: 'closets', Key: req.body.file, ContentType: 'png' };
    s3.getSignedUrl('putObject', params, function(err, url) {
        if(err) console.log(err);
        res.json({url: url});
    });
});

// form post to /addImage
//
// pass in { filename: file.name, type: file.type }
// $scope.upload = function(file) {
//     // Get The PreSigned URL
//     $http.post('/s' ,{ filename: file.name, type: file.type })
//       .success(function(resp) {
//         Perform The Push To S3
//         $http.put(resp.url, file, {headers: {'Content-Type': file.type}})
//           .success(function(resp) {
//             //Finally, We're done
//             alert('Upload Done!')
//           })
//           .error(function(resp) {
//             alert("An Error Occurred Attaching Your File");
//           });
//       })
//       .error(function(resp) {
//         alert("An Error Occurred Attaching Your File");
//       });
//   };

//Controllers
var userController = require('./controllers/index');
var clothingController = require('./controllers/closet');

//Routing
app.use('/', userController);
app.use('/closet', clothingController);

app.listen(process.env.PORT || 3000);
