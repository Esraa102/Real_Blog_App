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
          author: {
            userId: req.user._id,
            profileImg: req.user.imgProfile,
            username: req.user.username,
          },
        });
        res.status(201).json({ postData: newPost });
      }
    }
  } catch (error) {
    return next(customError(500, error.message));
  }
};

const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { "author.userId": req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const totalPostsMonthAgo = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo }, // to get the posts create one month ago
    });
    res.status(200).json({ posts, totalPosts, totalPostsMonthAgo });
  } catch (error) {
    return next(error);
  }
};
export { createPost, getPosts };
