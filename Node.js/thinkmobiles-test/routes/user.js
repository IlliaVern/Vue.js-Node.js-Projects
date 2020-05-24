require('dotenv').config()
const express = require('express');
const router = express.Router();
const { check} = require('express-validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const User = require('../models/User')

/* GET signup page. */
router.get('/signup', function(req, res, next){
  res.render('main', { title: 'Signup', shopName: 'ThinkMobiles Test Shop',
  page: 'signUp' })
})

/* Registering new user and adding to DB. */
router.post('/signup', [
  check("email", "Please enter a valid email").isLength({ min: 8, max: 40 }),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({ min: 6, max: 30 })
], (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          success: false, msg: 'Email exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              success: false, msg: err
            })
          } else {
            const user = new User({
              email: req.body.email,
              password: hash
            })
            user
              .save()
              .then(result => {
                res.status(201).json({
                  success: true, msg: 'User created'
                })
              })
              .catch(err => {
                res.status(500).json({
                  success: false, msg: err
                })
              })
          }
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false, msg: err
      })
    })
})

/* GET login page. */
router.get('/login', function(req, res, next){
  res.render('main', { title: 'Login', shopName: 'ThinkMobiles Test Shop',
  page: 'logIn' })
})

/* Login existing user. */
router.post('/login', [
  check("email", "Please enter a valid email").isLength({ min: 8, max: 40 }),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({ min: 6, max: 30 })
], (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user == null) {
        return res.status(401).json({
          success: false, msg: "Auth failure"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            success: false, msg: "Auth failure"
          })
        }
        if (result) {
          const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY, 
            {
              expiresIn: '1h'
            }
          )
          localStorage.setItem('userToken', token);
          return res.status(200).json({
            success: true, msg: "Auth successful",
            token: token
          })
        }
        res.status(401).json({
          success: false, msg: "Auth failure"
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false, msg: "Auth failure"
      })
    })
})

//Get Log out
router.get('/logout', function(req, res, next){
  localStorage.removeItem('userToken')
  res.render('main', { title: 'Login', shopName: 'ThinkMobiles Test Shop',
  page: 'logIn' })
})


module.exports = router;