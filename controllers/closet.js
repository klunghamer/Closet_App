var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// mongoose.Promise = global.Promise;

var User = require('../models/user');
var Clothing = require('../models/clothing');

//Show user's closet
router.get('/:id', function(req,res) {
  // var id = req.params.id;
  User.findById(req.params.id).exec()
  .then(function(user) {
    // console.log('this is user', user);
    res.render('closet/index', {
      user: user,
      title: 'Your Closet'
    })
  })
});

//Show form to edit user's closet
router.get('/:id/new', function(req,res) {
  User.findById(req.params.id).exec()
  .then(function(user) {
    res.render('closet/new', {
      user: user,
      title: 'New Clothing Item'
    })
  })
})

//Create new clothing item
router.post('/', function (req,res) {
  var user = String(req.session.passport.user);
  User.find({username: user}).exec()
  .then(function(user) {
    user[0].clothes.push({
      category: req.body.category,
      brand: req.body.brand,
      color: req.body.color,
      size: req.body.size,
      imageURL: req.body.imageURL
    })
    return user[0].save();
  })
  .then(function(result) {
    console.log(result);
  })
  .then(function() {
    return User.findOne({username: req.session.passport.user})
  })
  .then(function(user){
    res.redirect(`/closet/${user._id}`);
  })
})

//Show items
router.get('/:id/show', function(req,res) {
  // console.log(req.params.id);
  // var id = String(req.params.id)
  User.findOne({username: req.session.passport.user}).exec()
  .then(function(user) {
    var item = user.clothes.id(req.params.id)
    // .findIndex(function(clothes) {
    //   return clothes._id === req.params.id;
    // })
    // return item;
    res.render('closet/show', {
      user: user,
      item: item
    })
  })
  // .then(function(result) {
  //   console.log(result);
  // })
})

//Show edit page
router.get('/:id/edit', function (req,res) {
  User.findOne({username: req.session.passport.user}).exec()
  .then(function(user) {
    var item = user.clothes.id(req.params.id)
    res.render('closet/edit', {
      // user: user,
      item: item,
      title: 'Update Item'
    })
  })
})

//Edit clothing item
router.put('/:id', function (req,res) {
  User.findOne({username: req.session.passport.user}).exec()
  .then(function(user) {
    var item = user.clothes.id(req.params.id);
    // console.log(item.category);
    item.category = req.body.category;
    item.brand = req.body.brand;
    item.color = req.body.color;
    item.size = req.body.size;
    item.imageURL = req.body.imageURL;
    user.save();
    console.log(user);
    res.redirect(`/closet/${req.params.id}/show`);
  })
})

//Delete clothing item
router.delete('/:id', function (req,res) {
  User.findOne({username: req.session.passport.user}).exec()
  .then(function(user) {
    var item = user.clothes.id(req.params.id);
    // console.log(item.category);
    item.remove();
    user.save();
    res.redirect(`/closet/${user._id}`);
  })
})

module.exports = router;
