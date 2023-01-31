import express from "express";
import {
  getPostBySearch,
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/:id/commentPost", auth, commentPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likepost", auth, likePost);

export default router;
