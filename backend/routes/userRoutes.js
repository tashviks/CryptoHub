const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  trackCoin,
  buyCoin,
  getTrackedCoins,
  deleteTrackedCoin,
  deleteBoughtCoin,
  changeBoughtCoin,
  checkTrackedCoin,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.patch("/track", protect, trackCoin);
router.patch("/buy", protect, buyCoin);
router.get("/track", protect, getTrackedCoins);
router.get("/track/get/:id", protect, checkTrackedCoin);
router.patch("/track/delete", protect, deleteTrackedCoin);
router.patch("/buy/delete", protect, deleteBoughtCoin);
router.patch("/buy/change", protect, changeBoughtCoin);

module.exports = router;
