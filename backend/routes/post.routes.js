const actions = require("../actions/post.actions");

const routes = app => {
  // Get all posts
  app.get("/posts", actions.get);

  //Get author of post
  app.get("/posts/author/:id", actions.getAuthor);

  // Add new user
  app.post("/posts", actions.post);

  // Get a certain user
  app.get("/posts/:id", actions.getOne);

  // Edit a certain user
  app.put("/posts/:id", actions.put);

  // Delete a certain user
  app.delete("/posts/:id", actions.delete);
};

module.exports = routes;
