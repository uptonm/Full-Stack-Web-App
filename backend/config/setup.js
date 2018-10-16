const mongoose = require("mongoose");
require('dotenv').config();

mongoose.Promise = global.Promise;

beforeAll(done => {
  mongoose.connect(
    `mongodb://${process.env.USER}:${process.env.PASSWORD}@ds051833.mlab.com:51833/uptonm-fullstackblog`,
    { useNewUrlParser: true }
  );
  console.log('ran');
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Error", error);
    });
  mongoose.set("useFindAndModify", false);
});

// Drop all documents from collections before beginning testing
beforeAll = async () => {
  const { users, posts, comments } = mongoose.connection.collections;
  if (users) {
    const userDrop = await users.drop();
  }
  if (posts) {
    const postDrop = await posts.drop();
  }
  if (comments) {
    const commentDrop = await comments.drop();
  }
};
