const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");

//@desc   Create new post
//@route  POST /api/posts
//@access Private
const addPost = asyncHandler(async (req, res) => {
  const post = await Post.create({
    userId: req.user.id,
    coinId: req.body.coinId,
    tagId: req.body.tagId,
    text: req.body.text,
  });
  res.status(200).json(post);
});

//@desc   Get user posts
//@route  GET /api/posts
//@access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({
    userId: req.user.id,
  });
  res.status(200).json(posts);
});

module.exports = {
  addPost,
  getPosts,
};
