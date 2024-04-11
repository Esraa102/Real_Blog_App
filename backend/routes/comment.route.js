import express from "express";
import {
  createComment,
  getPostComments,
  likeComment,
  updateComment,
  deleteComment,
  getAllComments,
} from "../controllers/comment.controller.js";
import { validateToken } from "../middleware/validateToken.js";
const router = express.Router();

router.post("/create-comment", validateToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", validateToken, likeComment);
router.put("/update-comment/:commentId", validateToken, updateComment);
router.delete("/delete-comment/:commentId", validateToken, deleteComment);
router.get("/all-comments", validateToken, getAllComments);

export { router as commentRouter };
