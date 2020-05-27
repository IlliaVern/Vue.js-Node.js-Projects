const mongoose = require('mongoose')

const {Schema, model} = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        max: 100000,
        required: true
    },
    // prodImage: {
    //     type: String
    // },
    description: {
        type: String,
        minlength: 5,
        maxlength: 120,
        required: true
    }
})

module.exports = model("Product", productSchema)

