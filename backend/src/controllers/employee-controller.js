const { param } = require("express-validator");
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
    const existingEmployeeId = await employeeModel.findOne({ employeeId });
    if (existingEmployeeId) {
      return res.status(409).json({ message: "Employee ID already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role: "employee",
    });
    let employee;
    try {
      employee = await employeeModel.create({
        user: user._id,
        employeeId,
        department,
        designation,
        joiningDate,
        status,
      });
    } catch (err) {
      await userModel.findByIdAndDelete(user._id);
      throw err;
    }

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
  try {
    const employees = await employeeModel.find().populate("user", "-password");
    res.status(200).json({
      employees,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
}
async function getEmployeeById(req, res) {
  try {
    const employee = req.employee;
    res.status(200).json({
      message: " Emplyoee fetch successfully",
      employee,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function updateEmployee(req, res) {
  try {
    const employee = req.employee;

    const { fullname, email, phonenumber, department, employeeId, status } =
      req.body;

    const userUpdate = {};

    if (fullname) userUpdate.fullname = fullname;
    if (phonenumber) userUpdate.phonenumber = phonenumber;

    if (email && email !== employee.user.email) {
      const emailTaken = await userModel.findOne({ email });
      if (emailTaken) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }
      userUpdate.email = email;
    }

    let updatedUser = employee.user;
    if (Object.keys(userUpdate).length > 0) {
      updatedUser = await userModel
        .findByIdAndUpdate(employee.user._id, userUpdate, {
          new: true,
          runValidators: true,
        })
        .select("-password");
    }

    //update employee field
    const employeeUpdate = {};

    if (department) employeeUpdate.department = department;
    if (designation) employeeUpdate.designation = designation;
    if (status) employeeUpdate.status = status;

    if (employeeId && employeeId !== employee.employeeId) {
      const idTaken = await employeeModel.findOne({ employeeId });
      if (idTaken) {
        return res.status(409).json({ message: "Employee ID already in use" });
      }
      employeeUpdate.employeeId = employeeId;
    }

    let updatedEmployee = employee;
    if (Object.keys(employeeUpdate).length > 0) {
      updatedEmployee = await employeeModel.findByIdAndUpdate(
        employee._id,
        employeeUpdate,
        { new: true, runValidators: true },
      );
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      employee: {
        id: updatedEmployee._id,
        employeeId: updatedEmployee.employeeId,
        department: updatedEmployee.department,
        designation: updatedEmployee.designation,
        joiningDate: updatedEmployee.joiningDate,
        status: updatedEmployee.status,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        phonenumber: updatedUser.phonenumber,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, update fail",
    });
  }
}

async function deleteEmployee(req, res) {
  try {
    const employee = req.employee


    const deletedEmployee = await employeeModel.findByIdAndDelete( employee._id )

    if(!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found" 
      })
    }

    const deletedUser = await userModel.findByIdAndDelete( employee.user._id )

    if(!deletedUser) {
      console.warn(`Employee ${employee._id} deleted but no matching user found`)
    }
    res.status(200).json({
      message: "Employee deleteed successfully",
      employee:{
        id: employee._id,
        employeeId: employee.employeeId,
        fullname: employee.user?.fullneme,
        email: employee.user?.emial
      }

    })

  } catch (err) {
    return res.status(500).json({
      message: "Somethin went wrong, delet fail",
    })
  }
}

async function getMyProfile(req, res) {
  try{
    const id = req.user.userID
    const employee = await employeeModel.findOne({ user: id}).populate("user", "-password")

    if(!employee) {
      return res.status(404).json({
        message: "Employee profile not found "
      })
    }

    res.status(200).json({
      message: "Employee profile fetch successfully",
      employee
    })

  }catch(err){
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getMyProfile
};
