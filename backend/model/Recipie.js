const mongoose = require("mongoose")
const Schema=mongoose.Schema

const RecipieSchema= Schema({
    name:String,
    des:String,
    ingred:String,
    instruc:String,
})

const Recipie= mongoose.model("Recipie",RecipieSchema)

module.exports=Recipie