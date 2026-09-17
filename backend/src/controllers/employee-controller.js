const employeeModel = require("../model/Employee-modal");
const userModel = require("../model/User-modal");
const bcrypt = require("bcrypt");

async function createEmployee(req, res) {
  try {
    const {
      fullname,
      email,
      phonenumber,
      password,
      role,
      employeeId,
      department,
      designation,
      joiningDate,
      status,
    } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role: role || "employee",
    });

    await employeeModel.create({
      user: user._id,
      employeeId,
      department,
      designation,
      joiningDate,
      status,
    });

    return res.status(201).json({
      message: "Employee created successfully",
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create employee",
      error: error.message,
    });
  }
}
async function getAllEmployees(req, res) {
 try{
  const employees = await employeeModel.find().populate("user","-password")
  res.status(200).json({
    employees
  })

}catch(err){
  return res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  })
 }
}
module.exports = { createEmployee,getAllEmployees };
