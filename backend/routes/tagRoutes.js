const express = require("express");
const router = express.Router();
const { addTag, getTags } = require("../controllers/tagController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addTag).get(protect, getTags);

module.exports = router;
