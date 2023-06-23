'use strict';

const mongoose = require(mongoose);
const config = require(config);

module.exports = function () {
  const db = config.get('DB_URL');
  try {
    mongoose.connect(db);
  } catch (error) {
    console.log(error);
  }
};
