import { updateUser } from "../controllers/user.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import express from "express";

const router = express.Router();

router.put("/update/:id", validateToken, updateUser);

export { router as userRouter };
