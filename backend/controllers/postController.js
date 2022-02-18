const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const User = require("../models/userModel");
const Post = require("../models/postModel");
const { ObjectId } = require("mongoose");

// @desc get all posts
// @route GET /api/posts
// @access Private
const getAllPosts = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const posts = await Post.find();
  res.status(200).json(posts);
});

// @desc get user posts
// @route GET /api/posts/:postId
// @access Public
const getPublicUserPost = asyncHandler(async (req, res) => {
  const userPost = await Post.findById(req.params.postId);
  res.status(200).json(userPost);
});

// @desc get user posts
// @route GET /api/posts/:userId
// @access Private
const getUserPosts = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const userPosts = await Post.find({ user: req.user.id });
  res.status(200).json(userPosts);
});

// @desc create user posts
// @route POST /api/posts/
// @access Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, imageSrc } = req.body;
  // const imageData = {
  //   data: fs.readFileSync(
  //     path.join(__dirname, "../public", "images", req.file.filename)
  //   ),
  //   contentType: "image/jpeg",
  // };

  if (!title || !content) {
    res.status(400);
    throw new Error("Please add a title or(and) content");
  }

  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.create({
    title,
    content,
    imageSrc,
    author: req.user.name,
    user: req.user.id,
  });

  res.status(200).json(post);
});

// @desc get user ticket
// @route GET /api/posts/:userId/:id
// @access Private
const getPost = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authlized");
  }

  res.status(200).json(post);
});

// @desc delete user post
// @route DELETE /api/posts/:userId/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authlized");
  }

  await post.remove();

  res.status(200).json({ success: true });
});

// @desc update user post
// @route PUT /api/posts/:userId/:postid
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  console.log(req);
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authlized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    editDate: new Date(),
  });

  // console.log(req.body);
  // console.log(updatedPost);

  res.status(200).json(updatedPost);
});

module.exports = {
  getAllPosts,
  createPost,
  getUserPosts,
  getPost,
  deletePost,
  updatePost,
  getPublicUserPost,
};
