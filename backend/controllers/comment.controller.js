import { customError } from "../utils/customErr.js";
import { Comment } from "../models/comment.model.js";
const createComment = async (req, res, next) => {
  const { content, author, postId } = req.body;
  if (author.userId !== req.user._id) {
    next(customError(res.status(401), "You Are Unathenticated"));
  } else {
    try {
      const newComment = await Comment.create({
        content,
        postId,
        author,
      });
      res.status(201).json({ comment: newComment });
    } catch (error) {
      next(customError(res.status(500), error.message));
      console.log(error);
    }
  }
};

export { createComment };
