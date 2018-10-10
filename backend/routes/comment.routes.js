const actions = require("../actions/comment.actions");

const routes = app => {
  app.post("/comments", actions.post);
  app.get("/comments/:id", actions.get);
  app.put("/comments/:id", actions.put);
  app.delete("/comments/:id", actions.delete);
};

module.exports = routes;
