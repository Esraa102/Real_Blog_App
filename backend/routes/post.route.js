import express from "express";
import { validateToken } from "../middleware/validateToken.js";
import {
  createPost,
  getPosts,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";
const router = express.Router();

router.get("/getposts", getPosts);
router.get("/post/:postId", getPost);
router.post("/create", validateToken, createPost);
router.delete("/delete/:postId", validateToken, deletePost);
router.put("/update/:postId", validateToken, updatePost);

export { router as postRouter };
