const mongoose = require("mongoose");

const newSchema1 = new mongoose.Schema({
    user_name: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  });
  const collection1 = mongoose.model("collection1", newSchema1);
  
  module.exports = collection1