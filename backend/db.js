const mongoose=require('mongoose')

const connection=mongoose.connect('mongodb://127.0.0.1:27017/notepsc')

module.exports={
    connection
}