const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;
/* 
        schema for user
*/
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    //select: false
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
