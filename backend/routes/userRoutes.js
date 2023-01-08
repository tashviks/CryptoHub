const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  trackCoin,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.patch("/", trackCoin);

module.exports = router;
