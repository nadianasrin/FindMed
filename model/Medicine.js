var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MedicineSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  desc: { type: String, trim: true },
  groupName: { type: String, trim: true },
  company: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  price: Number
});

var Medicine = mongoose.model("Medicine", MedicineSchema);

module.exports = Medicine;
