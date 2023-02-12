const express = require("express");
const { check } = require("express-validator");

const auth = require("../../middlewares/auth.middleware");
const {
  getMyProfile,
  createOrUpdateUserProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteUserProfile,
  addProfileExperience,
  deleteProfileExperience,
  addProfileEducation,
  deleteProfileEducation,
  getGithubRepos,
} = require("../../controllers/profile.controllers");

const router = express.Router();

// @route    GET api/profile/me
// @desc     Get loggedIn user's profile
// @access   Private
router.get("/me", auth, getMyProfile);

// @route    POST api/profile
// @desc     Create or update user's profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").trim().notEmpty(),
      check("skills", "Skills is required").trim().notEmpty(),
    ],
  ],
  createOrUpdateUserProfile
);

// @route    GET api/profile
// @desc     Get all users profile
// @access   Public
router.get("/", getAllProfiles);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user id
// @access   Public
router.get("/user/:user_id", getProfileByUserId);

// @route    DELETE api/profile
// @desc     Delete profile, user and posts
// @access   Private
router.delete("/", auth, deleteUserProfile);

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").trim().notEmpty(),
      check("company", "Company is required").trim().notEmpty(),
      check("from", "From date is required").trim().notEmpty(),
    ],
  ],
  addProfileExperience
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete profile experience
// @access   Private
router.delete("/experience/:exp_id", auth, deleteProfileExperience);

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").trim().notEmpty(),
      check("degree", "Degree is required").trim().notEmpty(),
      check("fieldofstudy", "Field of study is required").trim().notEmpty(),
      check("from", "From date is required").trim().notEmpty(),
    ],
  ],
  addProfileEducation
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete profile education
// @access   Private
router.delete("/education/:edu_id", auth, deleteProfileEducation);

// @route    GET api/profile/github/:username
// @desc     Get user repos from github
// @access   Public
router.get("/github/:username", getGithubRepos);

module.exports = router;
