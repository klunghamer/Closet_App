var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//Landing page
router.get('/', function (req,res) {
  res.render('home', {
    title: 'Home page',
  })
});

//Sign up user and go back to landing page
router.post('/signup', function (req,res) {
  User.register(
    new User({
      username: req.body.username,
      createdAt: new Date(),
      updatedAt: new Date()
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
      res.redirect('/')
    }
  )
});



module.exports = router;
