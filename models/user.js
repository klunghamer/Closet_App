var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var ClothingSchema = require('./clothing').schema;

mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  clothes: [ClothingSchema]
})

UserSchema.pre('save', function(next){
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);

module.exports = User;
