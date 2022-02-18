const express = require("express");
const router = express.Router({ mergeParams: true });
const { getComments, addComment } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getComments).post(protect, addComment);

module.exports = router;
