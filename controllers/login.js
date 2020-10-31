const User = require("../models/auth");
const bcrypt = require("bcrypt");
/*
    @description  matches username for correct login
     and throw messages if user not found or login info is incorrect.
*/

exports.loginUser = User.login = async (name, password) => {
  try {
    const user = await User.findOne({ name: name });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
