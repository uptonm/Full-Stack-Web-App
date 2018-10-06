const actions = require("../actions/comment.actions");

const routes = app => {
  app.post("/comments", actions.post);
};

module.exports = routes;
