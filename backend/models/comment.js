const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
