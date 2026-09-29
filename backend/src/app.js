const express = require('express')
const helmet = require("helmet");
const cors = require("cors");
const cookieparser = require ('cookie-parser')

const app = express()
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieparser())
const authRoutes = require("./routes/auth-routes")
const employeeRoutes = require("./routes/employee-routes")
const taskRoutes = require ("./routes/task-routes")

app.use("/account", authRoutes)
app.use("/employee", employeeRoutes)
app.use("/tasks", taskRoutes)



module.exports = app