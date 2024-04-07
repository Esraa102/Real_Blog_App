import express from "express";
import {
  googleAuth,
  logInUser,
  registerUser,
  logOutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.post("/google", googleAuth);
router.get("/logout", logOutUser);

export { router as authRouter };
