const express = require("express");
const { show_expenses, add_expense, show_expense, update_expense, delete_expense } = require("../controller/expensecontroller");
const isAuthenticated = require("../middleware/authmiddleware");

const routes = express.Router();
routes.get("/", isAuthenticated, show_expenses);
routes.post("/add", isAuthenticated, add_expense);
routes.get("/:id", isAuthenticated, show_expense);
routes.put("/edit/:id", isAuthenticated, update_expense);
routes.delete("/del/:id", isAuthenticated, delete_expense);

module.exports = routes;