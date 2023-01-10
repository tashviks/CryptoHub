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

//@desc   Get posts by coin
//@route  GET /api/posts/coin
//@access Private
const getPostsByCoin = asyncHandler(async (req, res) => {
  const posts = await Post.find({
    coinId: req.body.coinId,
  });
  res.status(200).json(posts);
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

//@desc   Upvote a post
//@route  PATCH /api/posts/upvote
//@access Private
const upvotePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.body.postId, {
    $inc: { votes: req.body.votes },
  });
  res.status(200).json(post);
});

//@desc   Add comment to post
//@route  PATCH /api/posts/comment
//@access Private
const commentPost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.body.postId, {
    $push: {
      comments: {
        commUserId: req.user.id,
        commText: req.body.text,
      },
    },
  });
  res.status(200).json(post);
});

//@desc   Remove comment
//@route  PATCH /api/posts/comment/remove
//@access Private
const removeComment = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.body.postId, {
    $pull: {
      comments: {
        _id: req.body.commId,
      },
    },
  });
  res.status(200).json(post);
});

//@desc   Edit post
//@route  PATCH /api/posts
//@access Private
const editPost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      text: req.body.text,
    },
    { new: true }
  );
  res.status(200).json(post);
});

//@desc   Delete post
//@route  DELETE /api/posts
//@access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.postId);
  await post.delete();
  res.status(200).json(post);
});

module.exports = {
  addPost,
  getPosts,
  getPostsByCoin,
  upvotePost,
  commentPost,
  removeComment,
  editPost,
  deletePost,
};
