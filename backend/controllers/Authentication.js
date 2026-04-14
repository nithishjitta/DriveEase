const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

async function signup(req, res) {
  try {
    const body = req.body;
    const hashPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      contact: body.contact,
      password: hashPassword,
      imageUrl: req.file
        ? req.file.path
        : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg",
    });
    console.log("User created successfully");
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
}

async function signin(req, res) {
  try {
    const body = req.body;
    // console.log("Email entered:", body.email);
    // console.log("Password entered:", body.password);
    const user = await User.findOne({ email: body.email });
    // console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    console.log("user signed in successfully");
    res.json({
      message: "User signed in successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        contact: user.contact,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing in" });
  }
}
async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out" });
  }
}

module.exports = {
  signin,
  signup,
  logout,
};
