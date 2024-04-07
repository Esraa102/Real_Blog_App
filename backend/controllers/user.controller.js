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

export { updateUser };
