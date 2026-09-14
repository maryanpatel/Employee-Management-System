const mongoose = require("mongoose")

async function connectDB() {

    try{
         await mongoose.connect(process.env.MONGO_URI)
         console.log("connection successfull")

    }catch(err){
        console.err('Detabase connection err :', err)
    }
}

module.exports = connectDB