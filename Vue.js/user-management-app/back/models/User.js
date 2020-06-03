const mongoose = require('mongoose')

const {Schema, model} = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: true
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    phoneNumber: {
        type: Number,
        minlength: 3,
        maxlength: 13,
        required: true
    },
    address: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
})

module.exports = model("User", userSchema)