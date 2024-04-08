import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      userId: {
        type: String,
        required: true,
      },
      profileImg: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.sitereportcard.com/wp-content/uploads/2018/04/blog-images.jpeg",
    },
    content: {
      type: String,
      default: "No Content For This Post",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("posts", postSchema);
