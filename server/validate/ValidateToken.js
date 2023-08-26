import express from "express";
const router = express.Router();
import cookieParser from "cookie-parser";
import jwt, { decode } from "jsonwebtoken";

router.use(cookieParser());

export const validateToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.sendStatus(403).json("User not Authenticated!");
  }
};
