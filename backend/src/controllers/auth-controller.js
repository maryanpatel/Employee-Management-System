const userModel = require("../model/User-modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  const { fullname, email, phonenumber, password, role } = req.body;

  const isuserAlreadyExists = await userModel.findOne({ email: email });

  if (isuserAlreadyExists) {
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

    const admin = await userModel.create({
      fullname,
      email,
      phonenumber,
      password: hash,
      role,
    });

    var token = jwt.sign(
      { userID: admin._id, role: admin.role },
      process.env.JWT_SECERT,
    );

    res.cookie("token", token);
    res.status(201).json({
      message: "user created successfully ",
      fullname,
      email,
      role,
    });
  });
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  await bcrypt.compare(password, user.password, function (err, result) {

    if(err){
      return res.status(500).json({
        message: "internal error ",
      });
    }

    if( !result ){
      return res.status.json({
      message: "Invalid credentials",
    });
    }

    const token = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECERT)
    res.cookie("token", token)
    res.status(201).json({
      message: "user login successfully",
      fullname: user.fullname,
      role: user.role,
    })
    
  });
}

module.exports = { registerUser, userLogin };
