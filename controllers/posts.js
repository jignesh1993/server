import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");
    await PostMessage.findByIdAndDelete(_id);
    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.log("error -->>", error);
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // like post
      post.likes.push(req.userId);
    } else {
      // dislike post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("error -->>", error);
  }
};
