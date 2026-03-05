const express = require("express");
const { show_expenses, add_expense, show_expense, update_expense, delete_expense } = require("../controller/expensecontroller");
const authMiddleware = require("../middleware/authmiddleware");

const routes = express.Router();
routes.get("/", authMiddleware, show_expenses);
routes.post("/add", authMiddleware, add_expense);
routes.get("/:id", authMiddleware, show_expense);
routes.put("/edit/:id", authMiddleware, update_expense);
routes.delete("/del/:id", authMiddleware, delete_expense);

module.exports = routes;