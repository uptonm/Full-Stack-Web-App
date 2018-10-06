const mongoose = require("mongoose");
const Comment = require("../models/comment");

exports.post = async (req, res) => {
  const newComment = await new Comment(req.body).save();
  res.send(newComment);
};
