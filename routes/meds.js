const express = require("express");
const { check } = require("express-validator");

const { isAdmin } = require("../utils/utils");
const medController = require("../controller/medController");
const router = express.Router();

/* GET all meds */
router.get("/page/:pageNumber", medController.allMeds);

// route for add med form
router.get("/add", medController.addMed_get);

// add new med
router.post(
  "/add",
  [
    check("name")
      .not()
      .isEmpty(),
    check("groupName")
      .not()
      .isEmpty(),
    check("company")
      .not()
      .isEmpty(),
    check("price")
      .not()
      .isEmpty(),
    check("desc")
      .not()
      .isEmpty()
  ],
  isAdmin,
  medController.addMed_post
);

//search med by name
router.post("/search", medController.searchMed);

module.exports = router;
