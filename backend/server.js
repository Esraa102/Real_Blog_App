import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/connectDB.js";
import { authRouter } from "./routes/auth.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { userRouter } from "./routes/user.route.js";
import { postRouter } from "./routes/post.route.js";
import { commentRouter } from "./routes/comment.route.js";
const app = express();
connectToDB();

const port = process.env.PORT || 5001;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log("Server Running On", port);
});
