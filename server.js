//Express
var express = require('express');
var app = express();

//Debugging
var logger = require('morgan');
app.use(logger('dev'));

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

app.listen(4000);
