const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// @desc get comments for post
// @route GET /api/posts/:userId/:id/comments
// @access Private
const getComments = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const comments = await Comment.find({ post: req.params.id });
  console.log(post.comment);

  res.status(200).json(comments);
});

// @desc get comments for post
// @route GET /api/posts/:postid/comments
// @access Public
const getPublicComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId });
  res.status(200).json(comments);
});

// @desc create post comment
// @route POST /api/post/:userId/:id/comments
// @access Private
const addComment = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const comment = await Comment.create({
    comment: req.body.comment,
    post: req.params.id,
    user: req.user.id,
    name: user.name,
  });

  res.status(200).json(comment);
});

// @desc create post comment
// @route POST /api/post/:userId/:id/comments
// @access Public
const addPublicComment = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.body.userId);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const comment = await Comment.create({
    comment: req.body.comment,
    post: req.params.postId,
    user: user._id,
    name: user.name,
  });

  res.status(200).json(comment);
});

module.exports = {
  getComments,
  addComment,
  getPublicComments,
  addPublicComment,
};
