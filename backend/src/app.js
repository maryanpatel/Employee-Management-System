const express = require('express')
const helmet = require("helmet");
const cors = require("cors");
const cookieparser = require ('cookie-parser')

const app = express()
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(cookieparser())

const authRoutes = require("./routes/auth-routes")
const employeeRoutes = require("./routes/employee-routes")

app.use("/accounts", authRoutes)
app.use("/employee", employeeRoutes)



module.exports = app