import {
  updateUser,
  deleteUser,
  getAllusers,
} from "../controllers/user.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import express from "express";

const router = express.Router();

router.put("/update/:id", validateToken, updateUser);
router.delete("/delete/:id", validateToken, deleteUser);
router.get("/getusers", validateToken, getAllusers);
export { router as userRouter };
