'use strict';

const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../model/User');

const router = express.Router();

const {
  getUsers,
  getUser,
  loginUser,
  registerUser,
  deleteUser
} = require('../controller/userController');

router.get('/', getUsers);

router.get('/me', getUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.delete('/', deleteUser);
