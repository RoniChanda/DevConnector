const express = require("express");
const { check } = require("express-validator");

const auth = require("../../middlewares/auth.middleware");
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteCommentOfPost,
} = require("../../controllers/posts.controllers");

const router = express.Router();

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [auth, [check("text", "Text is required").trim().notEmpty()]],
  createPost
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, getAllPosts);

// @route    GET api/posts/:id
// @desc     Get post by id
// @access   Private
router.get("/:id", auth, getPostById);

// @route    DELETE api/posts/:id
// @desc     Delete post
// @access   Private
router.delete("/:id", auth, deletePost);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, likePost);

// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put("/unlike/:id", auth, unlikePost);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").trim().notEmpty()]],
  commentOnPost
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment of a post
// @access   Private
router.delete("/comment/:id/:comment_id", auth, deleteCommentOfPost);

module.exports = router;
