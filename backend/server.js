const path = require ('path')
require('dotenv').config({path: path.resolve(__dirname, '.env') })
const app = require ("./src/app")
const connectDB = require("./src/db/db")
const startOverdueTaskJob = require("./src/jobs/markOverdueTasks")
async function startServer() {
    try {
        await connectDB()
        startOverdueTaskJob();
        app.listen(3000, () => {
            console.log('server is running on port 3000')
        })
    } catch (err) {
        console.error('Server startup failed:', err.message)
        process.exitCode = 1
    }
}

startServer()

