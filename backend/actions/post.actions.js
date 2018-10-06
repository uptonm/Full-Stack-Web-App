const mongoose = require("mongoose");
const { Post } = require("../models/post");
const User = require("../models/user");
const { Comment } = require("../models/comment");

exports.get = async (req, res) => {
  // Get all Posts
  const exists = await Post.find();
  if (exists.length !== 0) return res.status(200).send(exists);
  return res.status(404).send("No Posts Found");
};

exports.getOne = async (req, res) => {
  // Get Post
  const exists = await Post.find({ _id: req.params.id });
  if (exists.length !== 0) {
    return res.status(200).send(exists);
  }
  return res.status(404).send("Post Not Found");
};

exports.post = async (req, res) => {
  // Create Post
  const exists = await Post.find(req.body);
  if (exists || exists.length === 0) {
    // Prevent duplicate posts
    const newPost = await new Post(req.body).save();
    return res.status(200).send(newPost);
  }
  res.status(400).send("Post already exists");
};

exports.put = async (req, res) => {
  // Edit Post
  const postUpdate = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, res) => {
      if (err) return res.status(404).send('Post not found');
    }
  );
  return res.status(200).send(postUpdate);
};

exports.delete = async (req, res) => {
  // Delete Post
  const postDelete = await Post.findByIdAndRemove(
    { _id: req.params.id },
    (err, res) => {
      if (err) return res.status(404).send(err);
    }
  );
  return res.status(200).send({ message: `Post ${req.params.id} deleted` });
};

exports.getAuthor = async (req, res) => {
  const exists = await Post.findById(req.params.id);
  if (exists) {
    const author = await User.findById(exists.author);
    if (author) {
      return res.status(200).send(author);
    }
    return res.status(404).send("Author not found");
  }
  return res.status(404).send("Post not found");
};

exports.getComments = async (req, res) => {
  const exists = await Post.find(req.params.id);
  const comments = post.comments;
  if (exists) {
    return comments
      ? res.status(200).send(comments)
      : res.status(404).send("This post contains no comments");
  }
  return res.status(404).send("Post not found");
};
