var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 30
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 40
  },
  licenceNo: {
    type: String,
    required: true,
    unique: true
  },
  degree: {
    type: String,
    required: true
  },
  chamberLocation: {
    type: String
  },
  isAdmin: {
    type: Boolean
  },
  tips: [{ type: mongoose.Schema.Types.ObjectId, ref: "tip" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
