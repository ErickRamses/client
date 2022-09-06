const mongoose=require("mongoose")

const Todo= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    timestamp:{
        type:String,
        default:Date.now()
    },
})

module.exports = mongoose.model("Todo",Todo)