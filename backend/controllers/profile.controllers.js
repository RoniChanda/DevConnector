const config = require("config");
const { validationResult } = require("express-validator");
const request = require("request");

const Profile = require("../models/Profile-model");
const User = require("../models/User-model");

//! ------------------------------------- getMyProfile function -------------------------------------
const getMyProfile = async (req, res, next) => {
  try {
    // check for profile and populate with needed fields from User model
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user", code: 400 });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ createOrUpdateUserProfile function ------------------------------------
const createOrUpdateUserProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build social object
  const social = { twitter, facebook, youtube, linkedin, instagram };
  // Build profile object
  const profileFields = {
    user: req.user.id,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills: skills.split(",").map((skill) => skill.trim()),
    social,
  };

  // create or update profile
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
    } else {
      // create profile
      profile = new Profile(profileFields);
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ getAllProfiles function ------------------------------------
const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ getProfileByUserId function ------------------------------------
const getProfileByUserId = async (req, res, next) => {
  const userId = req.params.user_id;
  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found.", code: 400 });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found.", code: 400 });
    }
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ deleteUserProfile function ------------------------------------
const deleteUserProfile = async (req, res, next) => {
  try {
    // TODO: remove user posts
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findByIdAndRemove(req.user.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ addProfileExperience function ------------------------------------
const addProfileExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  }

  const { title, company, location, from, to, current, description } = req.body;

  // create new experience object
  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found.", code: 400 });
    }

    profile.experience.unshift(newExperience); // Add new experience at the beginning of experience array
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ deleteProfileExperience function ------------------------------------
const deleteProfileExperience = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found.", code: 400 });
    }

    const expId = req.params.exp_id;
    // Finding experience with id and pulling it out of the array
    const experience = profile.experience.find((exp) => exp.id === expId);
    profile.experience.pull(experience);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ addProfileEducation function ------------------------------------
const addProfileEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;

  // create new education object
  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found.", code: 400 });
    }

    profile.education.unshift(newEducation); // Add new education at the beginning of education array
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ deleteProfileEducation function ------------------------------------
const deleteProfileEducation = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found.", code: 400 });
    }

    const eduId = req.params.edu_id;
    // Finding experience with id and pulling it out of the array
    const education = profile.education.find((edu) => edu.id === eduId);
    profile.education.pull(education);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------ getGithubRepos function ------------------------------------
const getGithubRepos = (req, res, next) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res
          .status(400)
          .json({ msg: "No Github profile found", code: 400 });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getMyProfile = getMyProfile;
exports.createOrUpdateUserProfile = createOrUpdateUserProfile;
exports.getAllProfiles = getAllProfiles;
exports.getProfileByUserId = getProfileByUserId;
exports.deleteUserProfile = deleteUserProfile;
exports.addProfileExperience = addProfileExperience;
exports.deleteProfileExperience = deleteProfileExperience;
exports.addProfileEducation = addProfileEducation;
exports.deleteProfileEducation = deleteProfileEducation;
exports.getGithubRepos = getGithubRepos;
