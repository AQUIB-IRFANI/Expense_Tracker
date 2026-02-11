const express = require("express");
const { registration, login, logout } = require("../controller/authcontroller");
const isAuthenticated = require("../middleware/authmiddleware");

const routes = express.Router();

routes.post("/register", registration);
routes.post("/login", login);
routes.post("/logout", logout);

routes.get("/check-auth", isAuthenticated, (req, res) => {
  res.status(200).json({ authenticated: true, userId: req.session.userId });
});

module.exports = routes;
