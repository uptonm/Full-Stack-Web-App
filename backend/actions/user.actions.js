const mongoose = require("mongoose");
const User = require("../models/user");

exports.get = async (req, res) => {
  const exists = await User.find();
  if (exists.length !== 0) return res.status(200).send(exists);
  return res.status(400).send("No Users Found");
};

exports.getOne = async (req, res) => {
  const exists = await User.find({ _id: req.params.id });
  if (exists.length !== 0) {
    return res.status(200).send(exists);
  }
  return res.status(400).send("User Not Found");
};

exports.post = async (req, res) => {
  const newUser = await new User(req.body).save();
  res.status(200).send(newUser);
};

exports.delete = async (req, res) => {
  const userDelete = await User.findByIdAndRemove(
    { _id: req.params.id },
    (err, res) => {
      if (err) return res.status(400).send(err);
    }
  );
  return res.status(200).send({ message: `User ${req.params.id} deleted` });
};

exports.put = async (req, res) => {
  const userUpdate = await User.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, res) => {
      if (err) return res.status(400).send(err);
    }
  );
  return res.status(200).send(userUpdate);
};
