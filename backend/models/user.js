const mongoose = require("mongoose");
const { Schema } = mongoose;
const { postSchema } = require("./post");

const userSchema = new Schema({
  first: String,
  last: String,
  email: String,
  posts: [postSchema]
});

// Virtual Field, does not persist to database, performs function to calculate locally
userSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

// middleware: run on remove call
userSchema.pre("remove", function(next) {
  const Posts = mongoose.model("posts");
  const Comments = mongoose.model("comments");
  // On user delete account delete all of their blog posts and comments
  Posts.deleteMany({ _id: { $in: this.Posts } })
    .then(() => Comments.deleteMany({ _id: { $in: this.Comments } }))
    .then(() => next());
});

const User = mongoose.model("users", userSchema);

module.exports = User;
