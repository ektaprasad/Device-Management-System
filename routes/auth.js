var express = require("express");
var User = require("../controllers/auth");
var existingUser = require("../controllers/login");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const saltRounds = 10;

router.get("/user/:id", async (req, res, next) => {
  try {
    var result = await User.getUser(req, res);
    res.send(result);
    res.status(200).json({
      device: result,
    });
  } catch (err) {
    next(err);
  }
});

/* takes user to signup */

router.post("/register", async (req, res, next) => {
  try {
    var result = await User.createUser(req.body);
    console.log("result " + result);
    if (result) {
      return res.json({ success: true, message: result });
    } else {
      return res.json({ success: false, message: "error" });
    }
  } catch (err) {
    next(err);
  }
});

/* takes user for login */

router.post("/login", async (req, res, next) => {
  try {
    // console.log("name=" + req.name);
    // console.log("name=" + req.body.name);
    const user = await existingUser.loginUser(req.body.name, req.body.password);

    if (user == null) {
      res.status(404).json({
        error: "user not found",
      });
    } else if (bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ success: true });
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    } else {
      res.status(404).json({
        error:"Invalid Login"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
