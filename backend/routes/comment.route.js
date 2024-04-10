import express from "express";
import { createComment } from "../controllers/comment.controller.js";
import { validateToken } from "../middleware/validateToken.js";
const router = express.Router();

router.post("/create-comment", validateToken, createComment);
// router.put("/update-comment/:id", createComment);
// router.delete("/delete/:id", createComment);
export { router as commentRouter };
