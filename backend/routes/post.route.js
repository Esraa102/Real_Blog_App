import express from "express";
import { validateToken } from "../middleware/validateToken.js";
import { createPost } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", validateToken, createPost);
export { router as postRouter };
