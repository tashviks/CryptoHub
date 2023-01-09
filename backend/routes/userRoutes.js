const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  trackCoin,
  buyCoin,
  getTrackedCoins,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.patch("/track", protect, trackCoin);
router.patch("/buy", protect, buyCoin);
router.get("/track", protect, getTrackedCoins);

module.exports = router;
