const auth_expense = require("../model/authmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registration = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;
    const userexist = await auth_expense.findOne({ username });
    if (userexist) {
      return res.status(409).json({ message: "User Already exist" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const user = new auth_expense({ username, password: hashpassword, email, name });
    await user.save();
    res.status(200).json({ message: "Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" + err })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await auth_expense.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User Doesn't Exist" });
    }
    console.log("User from DB:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged In Suuccessfully" });
  }
  catch (err) {
    res.status(500).json({ message: "Internal Server Error" + err })
  }
}


const logout = (req, res) => {

  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  res.status(200).json({
    message: "Logged out successfully"
  });
};

const check_auth = (req, res) => {
  res.status(200).json({ authenticated: true, user: req.user });
}

module.exports = { registration, login, logout, check_auth };
