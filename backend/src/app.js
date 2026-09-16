const express = require('express')
const helmet = require("helmet");
const cors = require("cors");
const cookieparser = require ('cookie-parser')
app.use(helmet());
app.use(cors());
const app = express()
app.use(express.json())
app.use(cookieparser())

const authRoutes = require("./routes/auth-routes")

app.use("/accounts", authRoutes)



module.exports = app