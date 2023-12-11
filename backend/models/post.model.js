import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: String,
    username: String,
    postImage: {
      type: Array,
      default: [],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
