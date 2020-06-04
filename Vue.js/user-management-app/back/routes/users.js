const express = require('express')
const router = express.Router()
// const { check} = require('express-validator')
const mongoose = require('mongoose')

const User = require('../models/User')

// Get all users from DB
router.get('/users', (req, res, next) => {
    User.find({})
        .exec()
        .then(users=>{
            res.status(200).json({success: true, data: users})
        })
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
})

//Adding new user to DB

router.post('/users/add', (req, res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    })
    user
        .save()
        .then(user=>{
            res.status(201).json({success: true, data: user})
        })
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
})

//Find user in DB for updating
router.get('/users/:id', (req, res, next) => {
    User.findById({_id: req.params.id})
        .exec()
        .then(userToUpdate=>{
            res.status(200).json({success: true, data: userToUpdate})
        })
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
})

//Updating previously founded user info in DB
router.put('/users/:id', (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.id}, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    }, {new:true})
        .exec()
        .then(user => {
            res.status(201).json({success: true, data: user})
        })
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
})

//Deleting user from DB
router.delete('/users', (req, res, next) => {
    User.findByIdAndDelete({_id: req.body.id})
        .exec()
        .then(res.json({success: true}))
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
}) 

module.exports = router;
