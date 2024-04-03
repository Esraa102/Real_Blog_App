import express from "express";
import {
  googleAuth,
  logInUser,
  registerUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.post("/google", googleAuth);

export { router as authRouter };
