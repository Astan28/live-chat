'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const md5 = require('crypto-js/md5');
const User = require('../model/User');

const secret = process.env.JWT_SECRET || 'secret';

const { mongoUrl } = config;
mongoose.connect(mongoUrl);

const getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.find(id);
  res.send(user);
};

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  const [userByName] = User.find({ username });
  if (userByName && userByName.id) {
    throw new Error('Username is not available');
  }

  const userByEmail = User.find({ email });
  if (userByEmail && userByEmail.id) {
    throw new Error('Email already in use');
  }
  const encryptedPassword = md5(password).toString();
  const user = new User({
    username,
    password: encryptedPassword,
    email
  });
  await user.save();
  res.send(user);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({ username, password: md5(password).toString() });

  if (!user || !user.id) {
    throw new Error('User with such credentials does not exist');
  }

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email
  }, secret);
  return res.send({ token });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err, docs) => {
    if (err) {
      console.log(err);
    } else console.log('deleted user: ', docs);
  });
  res.send({ message: `User with id ${id} has been deleted` });
};

module.exports = {
  getUsers,
  getUser,
  loginUser,
  registerUser,
  deleteUser
};
