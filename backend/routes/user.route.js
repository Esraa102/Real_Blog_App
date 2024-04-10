import {
  updateUser,
  deleteAccount,
  getAllusers,
  deleteUser,
  getUserById,
} from "../controllers/user.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import express from "express";

const router = express.Router();

router.put("/update/:id", validateToken, updateUser);
router.delete("/delete/:id", validateToken, deleteAccount);
router.delete("/deleteuser/:id", validateToken, deleteUser);
router.get("/getusers", validateToken, getAllusers);
router.get("/user/:userId", getUserById);
export { router as userRouter };
