const express = require("express");
const { registration, login, logout } = require("../controller/authcontroller");
const routes = express.Router();
routes.post("/register", registration);
routes.post("/login", login);
routes.post("/logout", logout);
routes.get("/check-auth", (req, res) => {
  if (req.session.userId) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = routes;