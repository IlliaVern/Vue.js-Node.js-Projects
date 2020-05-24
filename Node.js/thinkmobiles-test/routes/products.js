require('dotenv').config()

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { check} = require('express-validator')
const checkAuth = require('../middleware/checkAuth')

const Product = require('../models/Product')


/* GET products listing. */
router.get('/', (req, res, next) => {
    Product.find({})
        .exec()
        .then(products=>{
            (products.length) > 0 ? 
            (res.render('main', { title: 'Products page', shopName: 'ThinkMobiles Test Shop',
            page: 'products', products: products }) ) : 
            (res.status(404).render('main', { title: 'Products page', shopName: 'ThinkMobiles Test Shop',
            page: 'error', message: "Products not found" }))
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
})

/* GET add product page. */
router.get('/add', checkAuth, function(req, res, next){
    res.render('main', { title: 'Add product', shopName: 'ThinkMobiles Test Shop',
    page: 'addProduct' })
})

/* Adding new product to DB. */
router.post('/add', checkAuth, [
    check("title").isLength({
        min: 2,
        max: 30
    }).withMessage("Title must be min 2 letters and max 30 letters"),
    check("price").isFloat({
        min: 1,
        max: 100000
    }).withMessage("Price must be min 0 and max 100000"),
    check("description").isLength({
        min: 5,
        max: 50
    }).withMessage("Description must be from 5 up to 120 symbols")
], (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    })
    product
        .save()
        .then(product=>{
            res.status(201).json({success: true, msg: 'Product added'})
        })
        .catch(err => {
            res.status(500).json({success: false, msg: 'Adding failure'})
        })
})

/* Get product's edit page */
router.get('/edit/:productId', checkAuth, (req, res, next) => {
    Product.findById({_id: req.params.productId})
        .exec()
        .then(product=>{
            res.render('main', { title: 'Edit product', shopName: 'ThinkMobiles Test Shop',
            page: 'editProduct', product: product })
        })
        .catch(err => {
            res.status(500).render('main', { title: 'Edit product', shopName: 'ThinkMobiles Test Shop',
            page: 'error', message: "Product not found" })
        })
})

/* Edit product in DB */
router.put('/edit/:productId', checkAuth, [
    check("title").isLength({
        min: 2,
        max: 30
    }).withMessage("Title must be min 2 letters and max 30 letters"),
    check("price").isFloat({
        min: 1,
        max: 100000
    }).withMessage("Price must be min 0 and max 100000"),
    check("description").isLength({
        min: 5,
        max: 50
    }).withMessage("Description must be from 5 up to 120 symbols")
], (req, res, next) => {
    Product.findByIdAndUpdate({_id: req.params.productId}, {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description}, {new:true})
        .exec()
        .then(product => {
            res.status(200).json({success: true, msg: 'Updated successfully'})
        })
        .catch(err => {
            res.status(500).json({success: false, msg: 'Saving failure'})
        })
})

/* Delete product from DB. */
router.get('/delete/:productId', checkAuth, (req, res, next) => {
    Product.findByIdAndDelete({_id: req.params.productId})
        .exec()
        .then(res.redirect('/products'))
        .catch(err => {
            res.status(500).render('main', { title: 'Delete product', shopName: 'ThinkMobiles Test Shop',
            page: 'error', message: "Delete failure" })
        })
}) 

/* Get product's details view */
router.get('/details/:productId', (req, res, next) => {
    Product.findById({_id: req.params.productId})
        .exec()
        .then(product => {
            res.render('main', { title: 'Product details', shopName: 'ThinkMobiles Test Shop',
            page: 'productDetails', product: product })
        })
        .catch(err => {
            res.status(500).render('main', { title: 'Product details', shopName: 'ThinkMobiles Test Shop',
            page: 'error', message: "Product not found" })
        })
})

module.exports = router