import express from "express";
import { logInUser, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);

export { router as authRouter };
