import express from "express";
import { validateToken } from "../middleware/validateToken.js";
import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/post.controller.js";
const router = express.Router();

router.get("/getposts", getPosts);
router.post("/create", validateToken, createPost);
router.delete("/delete/:postId", validateToken, deletePost);

export { router as postRouter };
