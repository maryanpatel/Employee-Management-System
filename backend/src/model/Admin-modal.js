const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
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
        enum: ['admin'],
        default: 'admin',
    }
})

const adminModel = mongoose.model("admin", adminSchema)

module.exports = adminModel