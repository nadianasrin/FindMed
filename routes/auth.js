const express = require("express");
const { check } = require("express-validator");

const passport = require("../utils/passportConfig");
const router = express.Router();
const authController = require("../controller/authController");

// sign in route for form
router.get("/login", authController.login_get);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true
  })
);

// check route
router.get("/success", (req, res) => {
  console.log(req.user);
  return res.json(req.user);
});

// sign up route for form
router.get("/signup", authController.signup_get);

// sign up route for creating user
router.post(
  "/signup",
  [
    check("name")
      .notEmpty()
      .trim(),
    check("email")
      .notEmpty()
      .trim()
      .isEmail(),
    check("password").notEmpty(),
    check("licenceNo")
      .notEmpty()
      .trim(),
    check("degree")
      .notEmpty()
      .trim()
  ],
  authController.signup_post
);

// logout route
router.get("/logout", authController.logout);

module.exports = router;
