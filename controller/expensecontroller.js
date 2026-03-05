const expenseModel = require("../model/expensemodel");

const add_expense = async (req, res) => {
  try {
    const data = new expenseModel({ ...req.body, userId: req.user.userId });
    const result = await data.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
const show_expenses = async (req, res) => {
  try {
    const result = await expenseModel.find({ userId: req.user.userId });
    if (result != null)
      res.status(200).json(result);
    else
      res.status(404).json({ message: "No Expense Found" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" + err })
  }

}
const show_expense = async (req, res) => {
  try {
    const result = await expenseModel.findOne({ _id: req.params.id, userId: req.user.userId });
    if (result != null)
      res.status(200).json(result);
    else
      res.status(404).json({ message: "No Expense Found" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" + err })
  }
}
const update_expense = async (req, res) => {
  try {
    const edit = await expenseModel.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (edit)
      res.status(200).json(edit);
    else
      res.status(404).json({ message: "No Expense Found" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
const delete_expense = async (req, res) => {
  try {
    const result = await expenseModel.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (result != null)
      res.status(200).json(result);
    else
      res.status(404).json({ message: "No Expense Found" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" + err })
  }
}

module.exports = { add_expense, show_expenses, show_expense, update_expense, delete_expense };