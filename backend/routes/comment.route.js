import express from "express";
import {
  createComment,
  getPostComments,
  likeComment,
  updateComment,
} from "../controllers/comment.controller.js";
import { validateToken } from "../middleware/validateToken.js";
const router = express.Router();

router.post("/create-comment", validateToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", validateToken, likeComment);
router.put("/update-comment/:commentId", validateToken, updateComment);
// router.put("/update-comment/:id", createComment);
// router.delete("/delete/:id", createComment);
export { router as commentRouter };
