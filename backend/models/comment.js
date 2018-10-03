const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const Comments = mongoose.model("comments", commentSchema);

module.exports = Comments;
