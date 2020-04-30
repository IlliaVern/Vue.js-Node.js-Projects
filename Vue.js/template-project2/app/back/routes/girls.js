var express = require("express")
var router = express.Router()
const { check, validationResult} = require("express-validator")

//1. Imported module
const mongoose = require("mongoose")

//2. Setup connection
mongoose.connect('mongodb+srv://IlliaVern:Ae4474ex@cluster0-rnu3z.mongodb.net/girls?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

//3. Creating Schema
const Schema = mongoose.Schema

//3.1. Creating Schema model

const girlSchema = new Schema({
    name: String,
    age: Number,
    ethnic: String,
    children: Boolean,
    description: String
})

//4. Creating model

const Girl = mongoose.model("Girl", girlSchema)
//=============================================

//Get girls list
    router.get("/", function(req, res, next){
    //selection all documents from the base
    Girl.find({}, function (err, allGirls){
        if (err) return res.status(500).json({success:false, err: {msg: "Fetch failed"}})
        res.status(200).json({success:true, data: allGirls})
    })
})

//Adding new girl to the base

