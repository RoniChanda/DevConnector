const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User-model");

//! ------------------------------------- getAuthUser function -------------------------------------
const getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------- login function -------------------------------------
const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  }

  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid Credentials", code: 400 }] });
    }

    // Verify encrypted password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid Credentials", code: 400 }] });
    }

    // Return jsonwebtoken
    let token;
    try {
      const payload = { user: { id: user.id } };
      token = jwt.sign(payload, config.get("jwtSecretKey"), {
        expiresIn: 360000,
      });

      const { name, email, avatar, date } = user;
      res.json({ token, user: { name, email, avatar, date } });
    } catch (err) {
      throw err;
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAuthUser = getAuthUser;
exports.login = login;
