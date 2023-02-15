const mongoose =require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    pass:String,
    email:String
})

const userModel=mongoose.model("user",userSchema)

module.exports={
    userModel
}