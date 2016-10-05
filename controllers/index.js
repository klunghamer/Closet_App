var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//Landing page
router.get('/', function (req,res) {
  res.render('home', {
    title: 'Home page'
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
      })
    }
  );
// });

//Log in user
router.post('/login', passport.authenticate('local'), function (req,res) {
  req.session.save(function (err) {
    if (err) {
      console.log(err);
      res.redirect('/')
    } else {
      User.find({}).exec()
      .then(function(users) {
        // console.log(users);
        // console.log(req.user);
        res.render('users', {
          users: users,
          user: req.user,
          title: 'Closets'
        })
      })
      .catch(function(err) {
        console.log(err);
        res.redirect('/')
      })
    }
  })
})

//Added route that allows anyone to see the list of users
router.get('/users', function (req,res) {
  User.find({}).exec()
  .then(function(users) {
    res.render('users', {
      users: users,
      user: req.user,
      title: 'Closets'
    });
  })
})

//Log out user
router.delete('/signout', function (req,res) {
  req.logout();
  res.redirect('/')
});


module.exports = router;
