const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User-model");

//! ------------------------------------- registerUser function -------------------------------------
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists", code: 400 }] });
    }

    // Get users gravatar
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    // Encrypt password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = User({ name, email, password: hashedPassword, avatar });
    await user.save();

    // Return jsonwebtoken and login right away
    let token;
    try {
      const payload = { user: { id: user.id } };
      token = jwt.sign(payload, config.get("jwtSecretKey"), {
        expiresIn: 360000,
      });
      res.json({ token, user: { name, email, avatar, date: user.date } });
    } catch (err) {
      throw err;
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.registerUser = registerUser;
