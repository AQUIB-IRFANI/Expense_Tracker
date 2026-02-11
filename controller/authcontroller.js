const auth_expense = require("../model/authmodel");

const bcrypt = require("bcrypt");

const registration = async (req, res) => {
  const { username, password, email, name } = req.body;
  const userexist = await auth_expense.findOne({ username });
  if (userexist) {
    return res.status(409).json({ message: "User Already exist" });
  }
  const hashpassword = await bcrypt.hash(password, 10);

  const user = new auth_expense({ username, password: hashpassword, email, name });
  const result = await user.save();
  res.status(200).json({ message: "Registered Successfully" });

}

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await auth_expense.findOne({ username });
  if (!user) {
    res.status(404).json({ message: "User Doesn't Exist" });
  }
  console.log("User from DB:", user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  req.session.userId = user._id;
  res.status(200).json({ message: "Logged In Suuccessfully" });
}


const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid", {
      path: "/",
    });

    return res.status(200).json({ message: "Logout successful" });
  });
};


module.exports = { registration, login, logout };