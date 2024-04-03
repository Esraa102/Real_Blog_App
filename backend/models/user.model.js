import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgProfile: {
      type: String,
      default:
        "https://c4.wallpaperflare.com/wallpaper/184/515/626/digital-digital-art-artwork-illustration-drawing-hd-wallpaper-preview.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("users", userSchema);
