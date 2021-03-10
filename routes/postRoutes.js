const express = require("express");
const {
  createPost,
  getPost,
  getAllPosts,
  editPost,
  deletePost,
} = require("../controllers/postsController");
const authUser = require("../middleware/authUser");

const router = express.Router();

router.post("/", authUser, createPost);
router.get("/info/:id", authUser, getPost);
router.get("/all_info", authUser, getAllPosts);
router.patch("/edit/:id", authUser, editPost);
router.delete("/delete/:id", authUser, deletePost);

module.exports = router;
