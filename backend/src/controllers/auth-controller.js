const userModel = require("../model/User-modal");
const employeeModel = require("../model/Employee-modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  try {
    const { fullname, email, phonenumber, password, role, profilePic } = req.body;

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
      profilePic: profilePic || "",
    });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECERT,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: admin._id,
        fullname: admin.fullname,
        email: admin.email,
        phonenumber: admin.phonenumber,
        role: admin.role,
        profilePic: admin.profilePic || "",
      },
      token,
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
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
        profilePic: user.profilePic || "",
      },
      token,
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

    let employee = null;
    if (user.role === "employee") {
      employee = await employeeModel.findOne({ user: user._id });
    }

    res.status(200).json({ user, employee });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
}

async function updateUserProfile(req, res) {
  try {
    const { fullname, phonenumber, profilePic } = req.body;
    const updateData = {};

    if (fullname !== undefined) updateData.fullname = fullname.trim();
    if (phonenumber !== undefined) updateData.phonenumber = phonenumber;
    if (profilePic !== undefined) updateData.profilePic = profilePic;

    const updatedUser = await userModel
      .findByIdAndUpdate(req.user.id, updateData, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let employee = null;
    if (updatedUser.role === "employee") {
      employee = await employeeModel.findOne({ user: updatedUser._id });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        phonenumber: updatedUser.phonenumber,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic || "",
      },
      employee,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
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
  updateUserProfile,
  changePassword,
};
