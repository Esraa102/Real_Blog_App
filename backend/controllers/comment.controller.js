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

const getPostComments = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 }); // new comments first
    res.status(200).json({ comments });
  } catch (error) {
    next(customError(res.status(500), error.message));
  }
};
const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      next(customError(res.status(404), "Comment Not Found"));
    } else {
      const userIndex = comment.likes.indexOf(req.user._id);
      if (userIndex === -1) {
        comment.numberOfLiked += 1;
        comment.likes.push(req.user._id);
      } else {
        comment.numberOfLiked -= 1;
        comment.likes.splice(userIndex, 1);
      }
      await comment.save();
      res.status(200).json(comment);
    }
  } catch (error) {
    next(customError(res.status(500), error.message));
  }
};
const updateComment = async (req, res, next) => {
  if (req.user._id !== req.body.userId) {
    next(
      customError(
        res.status(403),
        "You're Only Allowed To Update Your Comments"
      )
    );
  } else {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        next(customError(res.status(404), "Comment Not Found"));
      } else {
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.commentId,
          {
            $set: {
              content: req.body.content,
            },
          },
          { new: true }
        );
        res.status(200).json(updatedComment);
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  }
};
export { createComment, getPostComments, likeComment, updateComment };
