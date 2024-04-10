import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      userId: {
        type: String,
        required: true,
      },
      imgProfile: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLiked: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comments", commentSchema);
