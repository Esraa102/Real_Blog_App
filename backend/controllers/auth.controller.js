import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { customError } from "../utils/customErr.js";

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(customError(res.status(400), "User Is Already Exist"));
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      if (!newUser) {
        return next(customError(res.status(400), "Wrong Credentials"));
      } else {
        const accessToken = jwt.sign(
          {
            _id: newUser._id,
            email: newUser.email,
            password: hashedPassword,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        const { password: encryptedPass, ...rest } = newUser._doc;
        const expireDate = new Date(Date.now() + 360000);
        res
          .cookie("access_token", accessToken, { expires: expireDate })
          .status(200)
          .json({ userData: rest });
      }
    }
  } catch (error) {
    return next(customError(res.status(500), error.message));
  }
};

const logInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next(customError(res.status(401), "User Is Unathorized"));
    } else {
      if (await bcryptjs.compare(password, user.password)) {
        const accessToken = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            password,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        const { password: encryptedPass, ...rest } = user._doc;
        const expireDate = new Date(Date.now() + 360000);

        res
          .cookie("access_token", accessToken, { expires: expireDate })
          .status(200)
          .json({ userData: rest });
      } else {
        next(customError(res.status(400), "Invalid Credentials"));
      }
    }
  } catch (error) {
    next(customError(res.status(500), error.message));
  }
};

const googleAuth = async (req, res, next) => {
  const { username, email, imgProfile } = req.body;
  const name =
    username.replace(" ", "").toLowerCase() + Math.ceil(Math.random() * 10000);
  const password = Math.random().toString(30).slice(2);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const user = await User.findOne({ email });
    if (user) {
      const accessToken = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          password: hashedPassword,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      const { password: encryptedPass, ...rest } = user._doc;
      const expireDate = new Date(Date.now() + 360000);

      res
        .cookie("access_token", accessToken, { expires: expireDate })
        .status(200)
        .json({ userData: rest });
    } else {
      const newUser = await User.create({
        username: name,
        email,
        password: hashedPassword,
        imgProfile,
      });
      if (!newUser) {
        return next(customError(res.status(400), "Wrong Credentials"));
      } else {
        const accessToken = jwt.sign(
          {
            _id: newUser._id,
            email: newUser.email,
            password: hashedPassword,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        const { password: encryptedPass, ...rest } = newUser._doc;
        const expireDate = new Date(Date.now() + 360000); // for 1 hour
        res
          .cookie("access_token", accessToken, { expires: expireDate })
          .status(200)
          .json({ userData: rest });
      }
    }
  } catch (error) {
    return next(customError(res.status(500), error.message));
  }
};
export { registerUser, logInUser, googleAuth };
