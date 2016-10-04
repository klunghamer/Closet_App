var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Clothing = ('../models/clothing');

module.exports = router;

router.get('/hi', function(req,res) {
  res.send('wassup')
});
