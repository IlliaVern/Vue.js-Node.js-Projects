var express = require('express');
var router = express.Router();

const User = require('../models/user')
const { prepareToken } = require('../utils/token')

router.post('/signup', function(req, res){
  var user = new User({email: req.body.email})
  user.setPassword(req.body.password)
  user.save()
      .then((user)=>{
        const token = prepareToken({id: user._id}, req.headers)
        return res.status(201).json({result:'Signuped successfully', token})
      })
      .catch((err)=>{
        return res.status(500).json({error:'Sugnup error'})
      })
})

router.post('/login', function(req, res){
  if(!req.body.email){
    return res.status(401).json({error:'Email is required'})
  }
  if(!req.body.password){
    return res.status(401).json({error:'Password is required'})
  }
  User.findOne({email:req.body.email})
    .exec()
    .then((user)=>{
      if(!user){
        return res.status(401).json({error:'User not found'})
      }
      if(!user.validPassword(req.body.password)){
        return res.status(401).json({error:'Password incorrect'})
      }
        const token = prepareToken({id: user._id}, req.headers)
        const expiresAt = new Date().getTime()+36000000
        res.status(200).json({
          result: 'Authorized',
          user:{
            authenticationData:{
              email: user._doc.email,
              access_token: token
            },
            expiresAt
          }
        })
    })
    .catch((err)=>{
      return res.status(401).json({error: 'Login error'})
    })
})

module.exports = router;
