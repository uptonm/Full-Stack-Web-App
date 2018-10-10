const mongoose = require("mongoose");
const { Comment } = require("../models/comment");
const { Post } = require("../models/post");

exports.get = async (req, res) => {
  const exists = await Comment.findById(req.params.id);
  if (exists) {
    return res.status(200).send(exists);
  }
  res.status(404).send({ message: "Comment not found" });
};

exports.put = async (req, res) => {
  const exists = await Comment.findById(req.params.id);
  if (exists) {
    const edit = await Comment.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send(edit);
  }
  res.status(404).send({ message: "Comment not found" });
};

exports.post = async (req, res) => {
  const newComment = await new Comment(req.body).save();
  const update = await Post.findByIdAndUpdate(req.body.post, {
    $push: { comments: newComment._id }
  });
  res.send(newComment);
};

exports.delete = async (req, res) => {
  const exists = await Comment.findById(req.params.id);
  if (exists) {
    const rmComment = await Comment.findByIdAndRemove(req.params.id);
    const rmFromPost = await Post.findByIdAndUpdate(rmComment.post, {
      $pull: { comments: { $in: req.params.id } }
    });
    return res.status(200).send({ message: `User ${req.params.id} deleted` });
  }
  return res.status(404).send({ message: `User ${req.params.id} not found` });
};
