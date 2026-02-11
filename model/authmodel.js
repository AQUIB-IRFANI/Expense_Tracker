const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }, email: {
    type: String,
    required: true,
    unique: true
  }, name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const authModel = mongoose.model("auth_expense", authSchema);
module.exports = authModel;