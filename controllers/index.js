var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/', function (req,res) {
  res.render('home', {
    title: 'Home page',
    user: 'user'
  })
});



module.exports = router;
