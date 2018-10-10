const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments"
    }
  ]
});

const Post = mongoose.model("posts", postSchema);

module.exports = { Post, postSchema };
