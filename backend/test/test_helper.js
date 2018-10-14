const mongoose = require("mongoose");

const USER = require('../keys').USER || process.env.USER;
const PASS = require('../keys').PASS || process.env.PASSWORD;

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(
    `mongodb://${USER}:${PASS}@ds051833.mlab.com:51833/uptonm-fullstackblog`,
    { useNewUrlParser: true }
  );
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
beforeEach = async () => {
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
