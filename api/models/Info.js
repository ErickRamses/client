const mongoose=require("mongoose")

const Info= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    info:Array,
    

   
})

module.exports = mongoose.model("Info",Info)