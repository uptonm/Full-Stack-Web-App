const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(
    "mongodb://localhost:27017/users_test",
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
