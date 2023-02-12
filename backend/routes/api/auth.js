const express = require("express");
const { check } = require("express-validator");

const auth = require("../../middlewares/auth.middleware");
const { getAuthUser, login } = require("../../controllers/auth.controllers");

const router = express.Router();

// @route    GET api/auth
// @desc     Get authenticated user
// @access   Public
router.get("/", auth, getAuthUser);

// @route    POST api/auth
// @desc     Login user
// @access   Public
router.post("/", [
  check("email", "Please include a valid email").trim().isEmail(),
  check(
    "password",
    "Please enter a valid password with 6 or more characters"
  ).exists(),
  login,
]);

module.exports = router;
