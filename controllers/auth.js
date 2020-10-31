const User = require("../models/auth");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

/*
        @ description 
        get details of user from database using user id

*/

exports.getUser = async (data) => {
  var result = await User.findById(data.params.id);
  console.log("r" + result);
  return result;
};

/*
        @ description 
        save new user into database and throw error if data already exist

*/

exports.createUser = async (data) => {
  const userValue = new User(data);
  return await userValue.save();
};
