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
import path from "path";
const app = express();
connectToDB();

const __dirname = path.resolve();
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

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.listen(port, () => {
  console.log("Server Running On", port);
});
