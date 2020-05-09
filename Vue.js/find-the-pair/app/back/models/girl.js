//1. Imported module
const mongoose = require("mongoose")
//2. Setup connection
mongoose.connect("mongodb+srv://IlliaVern:Ae4474ex@cluster0-rnu3z.mongodb.net/girls?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//3. Creating Schema
const Schema = mongoose.Schema

//3.1. Creating Schema model

const girlSchema = new Schema({
    name: String,
    age: Number,
    ethnic: String,
    children: String,
    imgFile: String,
    description: String
})

//4. Creating model

module.exports = mongoose.model("Girl", girlSchema)