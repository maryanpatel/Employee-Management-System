const employeeModel = require("../model/Employee-modal")

async function findEmployee(req, res, next) {
  
  try{

    const { id: employeeId} = req.params

    const employee = await employeeModel.findById(employeeId).populate("user", "-password")

    if(!employee){
      return res.status(404).json({
        message: "Employee not found"
      })
    }
    req.employee = employee
    next()

  }catch(err){

    if(err.name == "CastError"){
      return res.status(400).json({
        message: "Invalid employee ID"
      });
    }


    return res.status(500).json({
      message: "Something went wrong",
    })
  }
}

module.exports = findEmployee