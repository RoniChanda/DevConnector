const { validationResult } = require("express-validator");

const Profile = require("../models/Profile-model");
const User = require("../models/User-model");
const Post = require("../models/Post-model");

//! ------------------------------------- createPost function -------------------------------------
const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------- getAllPosts function -------------------------------------
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // sorting posts recent first, oldest last
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------- getPostById function -------------------------------------
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found", code: 400 });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found", code: 400 });
    }
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------- deletePost function -------------------------------------
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found", code: 400 });
    }

    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized", code: 401 });
    }

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found", code: 400 });
    }
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------- likePost function -------------------------------------
const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post already liked by the user once
    const isLiked =
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0;

    if (isLiked) {
      return res
        .status(400)
        .json({ msg: "Post already liked by the user", code: 400 });
    }

    // Add user if post not liked by the user
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------- unlikePost function -------------------------------------
const unlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post already liked by the user once
    const isLiked =
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0;

    if (!isLiked) {
      return res
        .status(400)
        .json({ msg: "Post has not yet been liked by the user", code: 400 });
    }

    // Remove like if post liked by the user
    const like = post.likes.find(
      (like) => like.user.toString() === req.user.id
    );
    post.likes.pull(like);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------- commentOnPost function -------------------------------------
const commentOnPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), code: 400 });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//! ------------------------------------- deleteCommentOfPost  function -------------------------------------
const deleteCommentOfPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found", code: 400 });
    }

    // check comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(400).json({ msg: "Comment not found", code: 400 });
    }

    // check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized", code: 401 });
    }

    post.comments.pull(comment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found", code: 404 });
    }
    res.status(500).send("Server Error");
  }
};

exports.createPost = createPost;
exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.deletePost = deletePost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.commentOnPost = commentOnPost;
exports.deleteCommentOfPost = deleteCommentOfPost;
