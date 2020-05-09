var express = require("express")
var router = express.Router()
const { check, validationResult } = require("express-validator")

const Girl = require('../models/girl')
//=============================================

//Get girls list
router.get("/", function (req, res, next) {
    //selection all documents from the base
    Girl.find({}, function (err, allGirls) {
        if (err) return res.status(500).json({success: false, err: {msg: "Fetch failed"}})
        res.status(200).json({success: true, data: allGirls})
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
            return res.json({ success: false, err: {msg: errors.array().map((e) => e.msg).join(", ")} })
        } else {
            //5.Creating document
            const girl = new Girl({
                name: req.body.name,
                age: req.body.age,
                ethnic: req.body.ethnic,
                children: req.body.children,
                imgFile: req.body.imgFile,
                description: req.body.description
            })
            //6.Saving the document
            girl.save(function (err, girl) {
                if (err) return res.status(500).json({success: false, err: {msg: "Saving failed"}})
                else res.status(201).json({success: true, data: girl})
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

router.get("/edit/:id", function (req, res, next) {
    Girl.findById({_id:req.params.id}, function (err, girlToUpdate) {
        if (err) return res.status(500).json({success: false, err: {msg: "Fetch failed"}})
        res.status(200).json({success: true, data: girlToUpdate})
    })
})
//Updating the girl
router.put("/edit/:id", function(req,res,next){
    Girl.findByIdAndUpdate({_id:req.params.id}, {
        name: req.body.name,
        age: req.body.age,
        ethnic: req.body.ethnic,
        children: req.body.children,
        imgFile: req.body.imgFile,
        description: req.body.description
    }, {new:true}, function(err,girl){
        if (err) return res.status(500).json({success:false, err:{msg:"Updating failed"}})
        else res.status(201).json({success:true, data:girl})
    })
})

module.exports = router