require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userModel = require("../model/User-modal")

async function createFirstAdmin(){
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await userModel.findOne({ role: "admin"})

    if (existing) {
        console.log("An admin already exist : ", existing.email)
        return process.exit()
    }

    const hashed = await bcrypt.hash(process.env.ADMIN_PASS,10);

    const admin = await userModel.create({
        fullname: "Test Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashed,
        role: "admin",

    })

    console.log("Frist admin created : ", admin.email)
    process.exit()
}

createFirstAdmin()