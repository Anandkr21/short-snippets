const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{type:"String", required:true},
    email:{type:"String", required:true},
    pass:{type:"String", required:true}
},{
    versionKey:false
})

const UserModel=mongoose.model('practice', userSchema)

module.exports={
    UserModel
}