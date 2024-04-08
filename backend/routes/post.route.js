import express from "express";
import { validateToken } from "../middleware/validateToken.js";
import { createPost, getPosts } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", validateToken, createPost);
router.get("/getposts", getPosts);
export { router as postRouter };
