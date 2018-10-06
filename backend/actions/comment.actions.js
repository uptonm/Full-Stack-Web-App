const mongoose = require("mongoose");
const { Comment } = require("../models/comment");
const { Post } = require("../models/post");

exports.post = async (req, res) => {
  const newComment = await new Comment(req.body).save();
  const update = await Post.findByIdAndUpdate(req.body.post, {
    $push: { comments: newComment }
  });
  res.send(newComment);
};
