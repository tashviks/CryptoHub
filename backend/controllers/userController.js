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

//@desc   Check if coin is tracked by user
//@route  GET /api/users/track/get/:id
//@access Private
const checkTrackedCoin = asyncHandler(async (req, res) => {
  const trackedCoin = await User.findOne({
    _id: req.user.id,
  }).select({
    trackedCoins: { $elemMatch: { coinId: req.params.id } },
  });
  if (trackedCoin && trackedCoin?.trackedCoins?.length > 0)
    res.status(200).json(true);
  else res.status(200).json(false);
});

//@desc   Delete tracked coin
//@route  DELETE /api/users/track
//@access Private
const deleteTrackedCoin = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    $pull: { trackedCoins: { coinId: req.body.coinId } },
  });
  res.status(200).json(updatedUser);
});

//@desc   Get tracked coins
//@route  GET /api/users/track
//@access Private
const getTrackedCoins = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("trackedCoins");
  res.status(200).json(user.trackedCoins);
});

//@desc   Get bought coins
//@route  GET /api/users/buy
//@access Private
const getBoughtCoins = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("boughtCoins");
  res.status(200).json(user.boughtCoins);
});

//@desc   Buy new coin
//@route  PATCH /api/users/buy
//@access Private
const buyCoin = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: {
        boughtCoins: {
          coinId: req.body.coinId,
          priceBought: req.body.priceBought,
          amount: req.body.amount,
        },
      },
    },
    { upsert: true }
  );
  res.status(200).json(updatedUser);
});

//@desc   Delete bought coin
//@route  PATCH /api/users/buy/delete
//@access Private
const deleteBoughtCoin = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      boughtCoins: {
        coinId: req.body.coinId,
      },
    },
  });
  res.status(200).json(updatedUser);
});

//@desc   Change amount
//@route  PATCH /api/users/buy/change
//@access Private
const changeBoughtCoin = asyncHandler(async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.id, "boughtCoins.coinId": req.body.coinId },
    { $inc: { "boughtCoins.$.amount": req.body.amount } },
    { new: true }
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
  getBoughtCoins,
  deleteTrackedCoin,
  deleteBoughtCoin,
  changeBoughtCoin,
  checkTrackedCoin,
};
