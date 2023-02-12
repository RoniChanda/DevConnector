const express = require("express");
const { check } = require("express-validator");
const { registerUser } = require("../../controllers/users.controllers");

const router = express.Router();

// @route    POST api/users
// @desc     Register user or signup user
// @access   Public
router.post("/", [
  check("name", "Name is required").trim().notEmpty(),
  check("email", "Please include a valid email").trim().isEmail(),
  check("password", "Please enter a valid password with 6 or more characters")
    .trim()
    .isLength({ min: 6 }),
  registerUser,
]);

module.exports = router;
