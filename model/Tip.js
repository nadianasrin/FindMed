var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TipSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  desc: String,
  created_at: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "user" }
});

var Tip = mongoose.model("Tip", TipSchema);

module.exports = Tip;

// title
// description
// author
//date
