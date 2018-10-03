const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  subject: String,
  content: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments"
    }
  ]
});

const Posts = mongoose.model("posts", postSchema);

module.exports = Posts;
