const User = require("../model/User");
const Tip = require("../model/Tip");
const { validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");

const addTip_get = (req, res) => {
  res.render("AddTipForm");
};

const addTip_post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { title, desc } = req.body;
  // sanitize user input
  const sanitizedDesc = sanitizeHtml(desc);
  try {
    // create new tip
    const newTip = await Tip.create({
      title,
      desc: sanitizedDesc,
      author: req.user._id
    });
    // find the author
    let user = await User.findById(req.user._id);
    // add tip to author object
    await user.tips.push(newTip);
    // save updated author
    await user.save();
    // res back
    req.flash("info", "Added Successfully.Would like to add another?");
    return res.redirect(`/doc/${req.user._id}`);
  } catch (error) {
    console.log(error);
    return res.send("something went wrong");
  }
};

const allTips = async (req, res, next) => {
  try {
    // declare page number
    let current = req.params.pageNumber || 1;
    // limit of item
    let perPage = 10;

    const tips = await Tip.find({})
      .skip(perPage * current - perPage)
      .limit(perPage)
      .populate({
        path: "author",
        model: User,
        select: ["_id", "name", "email"]
      })
      .sort({ created_at: -1 })
      .exec();
    // get the number of items
    const numberOfItem = await Tip.countDocuments({});
    //get total number of pages for pagination
    const pages = Math.ceil(numberOfItem / perPage);
    // send back data
    res.render("AllTips", { tips, pages, current });
    console.log(tips);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

const tipsById = (req, res) => {
  Tip.find({ _id: req.params.id })
    .populate({ path: "author", model: User })
    .exec((err, tip) => {
      if (err) {
        console.log(err);
        return res.send("error");
      }
      return res.render("ViewTips", { tip: tip[0] });
    });
};

module.exports = {
  allTips,
  tipsById,
  addTip_get,
  addTip_post
};
