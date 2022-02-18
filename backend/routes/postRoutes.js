const express = require("express");
const router = express.Router();
const multer = require("multer");
upload = multer({ dest: "pubic/images" });
const {
  getAllPosts,
  getUserPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllPosts).post(protect, createPost);
router.route("/:userId").get(protect, getUserPosts);
router
  .route("/:userId/:id")
  .get(protect, getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
