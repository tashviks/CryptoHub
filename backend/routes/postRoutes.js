const express = require("express");
const router = express.Router();
const {
  addPost,
  getPosts,
  upvotePost,
  commentPost,
  removeComment,
  editPost,
  deletePost,
  getPostsByCoin,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addPost)
  .get(protect, getPosts)
  .patch(protect, editPost)
  .delete(protect, deletePost);
router.route("/coin").get(protect, getPostsByCoin);
router.route("/votes").patch(protect, upvotePost);
router.route("/comments").patch(protect, commentPost);
router.route("/comments/remove").patch(protect, removeComment);

module.exports = router;
