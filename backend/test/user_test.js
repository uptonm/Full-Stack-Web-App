const assert = require("assert");
const axios = require("axios");
const User = require("../models/user");

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

  it("Gets a user", async () => {
    const exists = await axios.get("http://localhost:8000/users");
    assert(exists.data[0].first === "Joe");
  });
});

describe("User Post", () => {
  it("Posts a user", async () => {
    const newUser = await axios.post("http://localhost:8000/users", {
      first: "Joe"
    });
    const exists = await User.findOne(newUser.data);
    assert(exists.first === "Joe");
  });
});
