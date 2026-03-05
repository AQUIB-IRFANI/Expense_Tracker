const express = require("express");
const { registration, login, logout, check_auth } = require("../controller/authcontroller");
const authMiddleware = require("../middleware/authmiddleware");

const routes = express.Router();

routes.post("/register", registration);
routes.post("/login", login);
routes.post("/logout", logout);

routes.get("/check-auth", authMiddleware, check_auth);

module.exports = routes;
