const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

/* GET signup page. */
router.get('/signup', function(req, res, next){
  res.render('main', { title: 'Signup', shopName: 'ThinkMobiles Test Shop',
  page: 'signUp' })
})

/* Registering new user and adding to DB. */
router.post('/signup', (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
      // if (user !== null) { // попробовать (так понятнее)
        return res.status(409).json({
          success: false, err: {msg: err}
          // message: 'Email exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              success: false, err: {msg: err}
              // error: err
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
                  success: true, data: result
                  // message: 'User created'
                })
              })
              .catch(err => {
                res.status(500).json({
                  success: false, err: {msg: err}
                  // error: err
                })
              })
          }
        })
      }
    })
})

/* GET login page. */
router.get('/login', function(req, res, next){
  res.render('main', { title: 'Login', shopName: 'ThinkMobiles Test Shop',
  page: 'logIn' })
})

/* Login existing user. */
router.post('/login', (req, res, next) => {
  User.findOne({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          success: false, err: {msg: err}
          // message: 'Auth failure'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            success: false, err: {msg: err}
            // message: 'Auth failure'
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
          return res.status(200).json({
            success: true, data: result,
            // message: 'Auth successful',
            token: token
          })
        }
        res.status(401).json({
          message: 'Auth failure'
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false, err: {msg: err}
        // error: err
      })
    })
})


module.exports = router;