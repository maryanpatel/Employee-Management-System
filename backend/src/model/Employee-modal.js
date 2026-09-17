const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    user:   { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    employeeId: { type: String, unique: true }, // e.g. EMP001
    department: { type: String },
    designation: { type: String },
    joiningDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
},
{ timestamps: true }
)

const employeeModel = mongoose.model("employee", employeeSchema)

module.exports = employeeModel