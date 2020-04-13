const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { isAuthenticated } = require("../utils/utils");
const tipsController = require("../controller/tipsController");

/* GET all tips. */
router.get("/page/:pageNumber", tipsController.allTips);

// get tips by id
router.get("/id/:id", tipsController.tipsById);

// route to  tip form
router.get("/add", isAuthenticated, tipsController.addTip_get);

// add tip
router.post(
  "/add",
  [
    check("title")
      .trim()
      .not()
      .isEmpty(),
    check("desc")
      .not()
      .isEmpty()
  ],
  isAuthenticated,
  tipsController.addTip_post
);

module.exports = router;
