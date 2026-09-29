const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phonenumber: {
        type: Number,
        unique: true,
    },
    password:  {
        type: String,
        required: true, 
    },
    role: {
        type: String,
        enum: ['admin','employee'],
        default: 'employee',
    },
    profilePic: {
        type: String,
        default: "",
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel