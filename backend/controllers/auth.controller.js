import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    birthday,
    birthMonth,
    birthYear,
    gender,
    profilePic,
    friends,
  } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    userName,
    email,
    password,
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
    res.status(500).json(error.message);
  }
};
