var express = require("express")
var router = express.Router()
const {
    check,
    validationResult
} = require("express-validator")

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
router.get("/", function (req, res, next) {
    //selection all documents from the base
    Girl.find({}, function (err, allGirls) {
        if (err) return res.status(500).json({
            success: false,
            err: {
                msg: "Fetch failed"
            }
        })
        res.status(200).json({
            success: true,
            data: allGirls
        })
    })
})

//Adding new girl to the base
router.post("/add",
    [
        check("name").isLength({
            min: 4
        }).withMessage("Name must be min 4 letters"),
        check("age").isFloat({
            min: 18,
            max: 130
        }).withMessage("Age must be min 18 and max 130 years old"),
        check("description").isLength({
            min: 10,
            max: 180
        }).withMessage("Description must be from 10 up to 180 symbols")
    ],
    function (req, res, next) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({
                success: false,
                err: {
                    msg: errors.array().map((e) => e.msg).join(", ")
                }
            })
        } else {
            //5.Creating document
            const girl = new Girl({
                name: req.body.name,
                age: req.body.age,
                ethnic: req.body.ethnic,
                children: req.body.children,
                description: req.body.description
            })
            //6.Saving the document
            girl.save(function (err, girl) {
                if (err) return res.status(500).json({
                    success: false,
                    err: {
                        msg: "Saving failed"
                    }
                })
                else res.status(201).json({
                    success: true,
                    data: girl
                })
            })
        }
    }
)

//Deleting the girl
router.delete("/", function(req, res, next){
    Girl.findOneAndDelete({_id: req.body.id}, function(err,doc){
        if (err) return res.status(500).json({success:false, err:{msg:"Deleting failed"} })
        res.json({success:true})
    })
})

//Updating the girl
router.put("/")

module.exports = router