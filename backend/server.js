import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDB } from "./config/connectDB.js";
const app = express();
connectToDB();

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server Running On", port);
});

//StIo8o1wzQFtnVKE
