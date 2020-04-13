// import models
const User = require("../model/User");
const Tip = require("../model/Tip");
const Medicine = require("../model/Medicine");

const mongoose = require("mongoose");

const homePage = (req, res) => {
  res.render("Home");
};

const dashboard = async (req, res) => {
  const count = await countDocumentNumber();
  const users = await AllUser();
  res.render("Dashboard", { count, users });
};

const docprofile = async function(req, res, next) {
  var id = new mongoose.Types.ObjectId(req.params.id.slice(0, 24));
  try {
    var doctor = await User.findById(id).populate({ path: "tips", model: Tip });
    res.render("Profile", { doctor });
  } catch (error) {
    console.log(error);
    return res.render("Profile", { doctor: null });
  }
};

const deleteUser = async (req, res) => {
  // user id
  const id = new mongoose.Types.ObjectId(req.params.id);
  try {
    // delete user by id
    await User.findByIdAndDelete(id);
    // redirect to dashboard
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const countDocumentNumber = async () => {
  const numberOfTips = await Tip.find({}).countDocuments();
  const numberOfUsers = await User.find({ isAdmin: false }).countDocuments();
  const numberOfMedicines = await Medicine.find().countDocuments();
  return {
    numberOfTips,
    numberOfUsers,
    numberOfMedicines
  };
};

const AllUser = async () => {
  const users = await User.find({ isAdmin: false });
  return users;
};

module.exports = {
  homePage,
  dashboard,
  docprofile,
  deleteUser
};
