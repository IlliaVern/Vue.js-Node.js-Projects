var express = require("express")
var router = express.Router()
const { check, validationResult} = require("express-validator")
//1.Імпортували модуль
const mongoose = require("mongoose")
//2. Встановлюємо з"єднання
mongoose.connect('mongodb+srv://IlliaVern:FenRIR1989@cluster0-vp5fc.mongodb.net/girls', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})


