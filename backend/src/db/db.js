const mongoose = require("mongoose")

async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connection successfull")
    } catch (err) {
        console.error("Database connection error:", err.message)
        throw err
    }
}

module.exports = connectDB