const assert = require("assert");
const axios = require("axios");
const User = require("../models/user");
require('../config/setup')

let joe;

afterEach(done => {
  User.findOneAndRemove({ first: "Joe" }).then(() => done());
});

describe("User Get", () => {
  beforeEach(done => {
    joe = new User({ first: "Joe" });
    joe.save().then(() => {
      done();
    });
  });

  it("Saves a user", async () => {
    const exists = await User.findOne({ first: "Joe" });
    assert(exists);
  });
});

