import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
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
  const newUser = new User({
    firstName,
    lastName,
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
