import { User } from "../models/user.model.js";
import { customError } from "../utils/customErr.js";
import bcryptjs from "bcryptjs";
const updateUser = async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    next(customError(403, "You're Only Allowed to update your profile"));
  } else {
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            password: req.body.password,
            imgProfile: req.body.imgProfile,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json({ userData: rest });
    } catch (error) {
      next(customError(500, error.message));
    }
  }
};

const deleteAccount = async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    return next(
      customError(403, "You Are Only Allowed To Delete Your Profile")
    );
  } else {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(customError(404, "User Not Found"));
      } else {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ res: "Deleted Successfully" });
      }
    } catch (error) {
      return next(customError(500, error.message));
    }
  }
};
const getAllusers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      customError(res.status(403), "Admins Only Are Allowed To See All Users")
    );
  } else {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === "asc" ? 1 : -1;
      const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const usersWithoutPasswords = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });
      const totalUsers = await User.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const totalUsersLastMonth = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo }, // to get the users create one month ago
      });
      res.status(200).json({
        users: usersWithoutPasswords,
        totalUsers,
        totalUsersLastMonth,
      });
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(customError(res.status(403), "Only Admins Can Delete Users"));
  } else {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User Deleted Successfully");
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  }
};
export { updateUser, deleteAccount, getAllusers, deleteUser };
