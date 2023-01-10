const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Tag = require("../models/tagModel");

//@desc   Create new tag
//@route  POST /api/tags
//@access Private
const addTag = asyncHandler(async (req, res) => {
  const tag = await Tag.create({
    title: req.body.title,
    description: req.body.description,
  });
  res.status(200).json(tag);
});

//@desc   Get all tags
//@route  GET /api/tags
//@access Private
const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find();
  res.status(200).json(tags);
});

module.exports = { addTag, getTags };
