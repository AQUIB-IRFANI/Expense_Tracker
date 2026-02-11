
const expenseModel = require("../model/expensemodel");

const add_expense = async (req, res) => {
  const data = new expenseModel({ ...req.body, userId: req.session.userId });
  const result = await data.save();
  res.status(200).json(result);
}
const show_expenses = async (req, res) => {
  const result = await expenseModel.find({ userId: req.session.userId });
  if (result != null)
    res.status(200).json(result);
  else
    res.status(404).json({ message: "No Expense Found" });
}
const show_expense = async (req, res) => {
  const result = await expenseModel.findById({ _id: req.params.id, useId: req.session.useId });
  if (result != null)
    res.status(200).json(result);
  else
    res.status(404).json({ message: "No Expense Found" });
}
const update_expense = async (req, res) => {
  const result = await expenseModel.findById({ _id: req.params.id, useId: req.session.useId });
  if (result != null) {
    const edit = await expenseModel.findByIdAndUpdate({ _id: req.params.id, useId: req.session.useId }, req.body, { new: true });
    res.status(200).json(edit);
  }
  else
    res.status(404).json({ message: "No Expense Found" });
}
const delete_expense = async (req, res) => {
  const result = await expenseModel.findByIdAndDelete({ _id: req.params.id, useId: req.session.useId });
  if (result != null)
    res.status(200).json(result);
  else
    res.status(404).json({ message: "No Expense Found" });
}

module.exports = { add_expense, show_expenses, show_expense, update_expense, delete_expense };