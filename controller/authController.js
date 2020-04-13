const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../model/User");

const login_get = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("Signin", { message: req.flash("error") });
};

const signup_get = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("Signup");
};

const signup_post = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    // check if the user already exists
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          const { name, email, licenceNo, degree, chamberLocation } = req.body;

          User.create({
            name,
            email,
            password: hashedPass,
            licenceNo,
            degree,
            chamberLocation,
            isAdmin: false
          })
            .then(data => {
              res.redirect("/auth/login");
            })
            .catch(err => console.log(err));
        } else {
          req.flash("message", "User already exists");
          res.redirect("/auth/signup");
        }
      })
      .catch(err => res.send(err));
  } catch (error) {
    throw error;
  }
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  login_get,
  signup_get,
  signup_post,
  logout
};
