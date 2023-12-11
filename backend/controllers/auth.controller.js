import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const signUp = async (req, res, next) => {
  dotenv.config();
  const {
    firstName,
    lastName,
    email,
    password,
    birthday,
    birthMonth,
    birthYear,
    gender,
    profilePic,
    friends,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const generatedUserName =
    firstName.toLowerCase() +
    lastName.toLowerCase() +
    Math.random().toString(36).slice(-4);
  const newUser = new User({
    firstName,
    lastName,
    userName: generatedUserName,
    email,
    password: hashedPassword,
    birthday,
    birthMonth,
    birthYear,
    gender,
    profilePic,
    friends,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully..");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Password!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(201).json("user logged out.");
  } catch (error) {
    next(error);
  }
};
