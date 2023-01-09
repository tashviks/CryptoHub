const express = require("express");
const router = express.Router();
const { addPost, getPosts } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addPost).get(protect, getPosts);

module.exports = router;
