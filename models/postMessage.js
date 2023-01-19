import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const PostMessage = mongoose.model("postMessage", postSchema);
export default PostMessage;
