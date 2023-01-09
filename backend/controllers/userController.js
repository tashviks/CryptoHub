const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc   Register new user
//@route  POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc   Authorize user
//@route  POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

//@desc   Track new coin
//@route  PATCH /api/users/track
//@access Private
const trackCoin = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { trackedCoins: { coinId: req.body.coinId } } },
    { safe: true, upsert: true, new: true }
  );
  res.status(200).json(updatedUser);
});

//@desc   Get tracked coins
//@route  GET /api/users/track
//@access Private
const getTrackedCoins = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("trackedCoins");
  res.status(200).json(user.trackedCoins);
});

//@desc   Buy new coin
//@route  PATCH /api/users/buy
//@access Private
const buyCoin = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.body.userId,
    {
      $push: {
        boughtCoins: {
          coinId: req.body.coinId,
          priceBought: req.body.priceBought,
        },
      },
    },
    { safe: true, upsert: true, new: true }
  );
  res.status(200).json(updatedUser);
});

//  Generate user JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  trackCoin,
  buyCoin,
  getTrackedCoins,
};
