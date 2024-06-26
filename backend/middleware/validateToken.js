import { customError } from "../utils/customErr.js";
import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  console.log(req.cookies);
  if (!token) {
    return next(
      customError(
        res.status(401),
        "Your Are Unathenticated, You Need To Log In"
      )
    );
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(customError(res.status(400), "Invalid Token"));
    }
    req.user = decoded;
    next();
  });
};
