const express = require('express')
const cookieparser = require ('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieparser())

const authRoutes = require("./routes/auth-routes")

app.use("/accounts", authRoutes)



module.exports = app