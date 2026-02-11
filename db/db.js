require("dotenv").config();
const mongoose = require("mongoose");
const mongodb = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to DB...');

    }).catch((err) => {
      console.log("MongoDB connection Error: "+ err);

    });
}

module.exports = mongodb;
