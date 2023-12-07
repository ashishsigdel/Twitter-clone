import mongoose from "mongoose";

const userSchemaa = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    requierd: true,
    min: 8,
    max: 50,
  },
  birthDay: {
    type: Number,
    default: 1,
  },
  birthMonth: {
    type: Number,
    default: 1,
  },
  birthYear: {
    type: Number,
    default: 2000,
  },
  gender: {
    type: String,
    require: true,
  },
  profilePic: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStcMBdszv05cHquHzuTUQ1podq5JFd1vckt8REJXDgKA&s",
  },
  friends: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchemaa);

export default User;
