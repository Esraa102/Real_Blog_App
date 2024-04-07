import { Post } from "../models/post.model.js";
import { customError } from "../utils/customErr.js";

const createPost = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return next(customError(403, "Please Enter all required fields"));
    } else {
      const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^A-Za-z0-9\-]/g, "");
      const post = await Post.findOne({ title: req.body.title });
      if (post) {
        console.log(res.statusCode);
        return next(customError(400, "Post Already Exist"));
      } else {
        const newPost = await Post.create({
          ...req.body,
          slug,
          author: req.user._id,
        });
        res.status(201).json({ postData: newPost });
      }
    }
  } catch (error) {
    return next(customError(500, error.message));
  }
};

export { createPost };
