const actions = require("../actions/user.actions");

const routes = app => {
  // Get all users
  app.get("/users", actions.get);

  // Add new user
  app.post("/users", actions.post);

  // Get a certain user
  app.get("/users/:id", actions.getOne);

  // Edit a certain user
  app.put("/users/:id", actions.put);

  // Delete a certain user
  app.delete("/users/:id", actions.delete);
};

module.exports = routes;
