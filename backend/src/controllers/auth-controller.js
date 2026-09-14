const adminModel = require("../model/Admin-modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerAdmin(req, res) {
    console.log(req.body)
  const { fullname, email, phonenumber, password, role } = req.body;

  const isAdminAlreadyExists = await adminModel.findOne({ email: email });

  if ( isAdminAlreadyExists) {
    return res.status(409).json({
      message: "User Already Exist",
    });
  }

  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      return res.status(500).json({
        message: "internal error from hashing",
      });
    }

    const admin = await adminModel.create({
        fullname,
        email,
        phonenumber,
        password: hash,
        role,
    })

    var token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECERT);

    res.cookie("token", token)
    res.status(201).json({
        message: "Admin created successfully ",
        admin,
    })

  });
}


module.exports = { registerAdmin }