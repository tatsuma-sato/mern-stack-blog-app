const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getPublicComments,
  addPublicComment,
} = require("../controllers/commentController");
upload = multer({ dest: "pubic/images" });
const {
  getAllPosts,
  getUserPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPublicUserPost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
const commentRouter = require("./commentRoutes");

// re-route into comment router
router.use("/:userId/:id/comments", commentRouter);
router.route("/:postId/comments").get(getPublicComments);

router.route("/").get(protect, getAllPosts).post(protect, createPost);
router.route("/:userId").get(protect, getUserPosts);
router.route("/:postId/pub").get(getPublicUserPost).post(addPublicComment);
router
  .route("/:userId/:id")
  .get(protect, getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
