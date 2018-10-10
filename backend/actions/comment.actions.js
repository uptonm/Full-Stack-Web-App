const mongoose = require("mongoose");
const { Comment } = require("../models/comment");
const { Post } = require("../models/post");

exports.get = async (req, res) => {
  const exists = await Comment.findById(req.params.id);
  if (exists) {
    return res.status(200).send(exists);
  }
  res.status(404).send('Comment not found');
}

exports.post = async (req, res) => {
  const newComment = await new Comment(req.body).save();
  const update = await Post.findByIdAndUpdate(req.body.post, {
    $push: { comments: newComment }
  });
  res.send(newComment);
};
