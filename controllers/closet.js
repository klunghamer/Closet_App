var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// mongoose.Promise = global.Promise;

var User = require('../models/user');
var Clothing = require('../models/clothing');

router.get('/:id', function(req,res) {
  // var id = req.params.id;
  User.findById(req.params.id).exec()
  .then(function(user) {
    // console.log('this is user', user);
    res.render('closet/index', {
      user: user
    })
  })
});


module.exports = router;
