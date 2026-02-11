const mongoose = require("mongoose");
require("dotenv").config();
const mongodb = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to DB...');

    }).catch((err) => {
      console.log(err);

    });
}

module.exports = mongodb;