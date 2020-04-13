const Medicine = require("../model/Medicine");
const { validationResult } = require("express-validator");

const allMeds = async (req, res, next) => {
  try {
    // declare page number
    let current = req.params.pageNumber || 1;
    // limit of item
    let perPage = 12;

    const meds = await Medicine.find({})
      .skip(perPage * current - perPage)
      .limit(perPage)
      .sort({ date: -1 });
    // get the number of items
    const numberOfItem = await Medicine.countDocuments({});
    //get total number of pages for pagination
    const pages = Math.ceil(numberOfItem / perPage);
    res.render("AllMed", { meds, pages, current });
  } catch (error) {
    console.log(error);
  }
};

const addMed_get = (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  res.render("AddMedForm");
};

const addMed_post = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { name, groupName, company, price, desc } = req.body;

  Medicine.findOne({ name }, (err, docs) => {
    if (err) {
      return res.send("error");
    }
    if (docs) {
      let message = `Medicine with the name ${docs.name} already exists`;
      req.flash("info", message);
      return res.redirect("/meds/add");
    }
    Medicine.create({
      name,
      desc,
      groupName,
      company,
      price
    })
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
        return res.send("error");
      });
    req.flash("info", "Added Successfully.Would like to add another?");
    return res.redirect("/meds/add");
  });
};

const searchMed = async (req, res) => {
  const name = req.body.name;
  try {
    const med = await Medicine.findOne({ name });
    res.render("SearchMed", { med });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  allMeds,
  addMed_get,
  addMed_post,
  searchMed
};
