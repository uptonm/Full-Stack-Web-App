const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const postSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const Post = mongoose.model("posts", postSchema);

module.exports = { Post, postSchema };
