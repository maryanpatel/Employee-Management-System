const userModel = require("../model/User-modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;

    const isuserAlreadyExists = await userModel.findOne({ email: email });

    if (isuserAlreadyExists) {
      return res.status(409).json({
        message: "User Already Exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const admin = await userModel.create({
      fullname,
      email,
      phonenumber,
      password: hash,
      role,
    });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECERT,
    );

    res.cookie("token", token);
    res.status(201).json({
      message: "user created successfully ",
      fullname,
      email,
      role,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECERT,
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "user login successfully",
      fullname: user.fullname,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
}

async function userLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Logout failed",
      error: err.message,
    });
  }
}

async function getCurrentuser(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const ismatch = await bcrypt.compare(oldPassword, user.password);

    if (!ismatch)
      return res.status(400).json({ message: "Old password is inccorect" });

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
}
module.exports = {
  registerUser,
  userLogin,
  userLogout,
  getCurrentuser,
  changePassword,
};
