const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "seller"]
    }
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}