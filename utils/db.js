const mongoose = require("mongoose");

function connectDB() {
  mongoose.set("useUnifiedTopology", true);
  mongoose.connect(
    "mongodb://localhost/test",
    { useNewUrlParser: true, useCreateIndex: true },
    () => console.log("mongoose connected---------")
  );
}

module.exports = connectDB;
