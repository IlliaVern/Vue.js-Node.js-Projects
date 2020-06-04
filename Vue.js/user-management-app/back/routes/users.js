const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/User')

// Get all users from DB

router.get('/users', (req, res, next) => 
    User.find()
        .then(users=>{
            res.status(200).json({success: true, data: users})
        })
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
)

//Adding new user to DB

router.post('/users', (req, res, next) => 
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        })
        .then(user=>{
            res.status(201).json({success: true, data: user})
        })
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
)

//Find user in DB for updating

router.get('/users/:id', (req, res, next) => 
    User.findOne({_id: req.params.id})
        .then(userToUpdate=>{
            res.status(200).json({success: true, data: userToUpdate})
        })
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
)

//Updating previously founded user info in DB

router.put('/users/:id', (req, res, next) => 
    User.findByIdAndUpdate({_id: req.params.id}, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    }, {new:true})
        .then(user => {
            res.status(201).json({success: true, data: user})
        })
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
)

//Deleting user from DB

router.delete('/users', (req, res, next) => 
    User.findByIdAndDelete({_id: req.body.id})
        .then(res.json({success: true}))
        .catch(err => {
            res.status(500).json({success: false, error: err})
        })
) 

module.exports = router;
