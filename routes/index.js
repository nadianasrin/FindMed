const express = require("express");
const router = express.Router();

const { isAdmin } = require("../utils/utils");

const indexController = require("../controller/indexController");

/* GET home page. */
router.get("/", indexController.homePage);

// get doc profile
router.get("/doc/:id", indexController.docprofile);

// get dashborad
router.get("/admin/dashboard", isAdmin, indexController.dashboard);

// remove a user
router.get("/doc/remove/:id", isAdmin, indexController.deleteUser);

module.exports = router;
