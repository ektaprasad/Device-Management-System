const express = require("express");
const devices = require("../controllers/device");
const router = express.Router();
const checkAuth = require("../lib/check-auth");

/* get existing device's details from db using id of the device*/

router.get("/devices", async (req, res, next) => {
  try {
    
    var result = await devices.getDevice();
    res.send(result);
    res.status(200).json({
      device: result,
    });
    
  } catch (err) {
    next(err);
  }
});
//get single device from search

router.post("/deviceSearch", async (req, res, next) => {
  try {
    
    var result = await devices.getSearchedDevice(req.body.keyword);
    res.send(result);
    res.status(200).json({
      device: result,
    });
    
  } catch (err) {
    next(err);
  }
});
// deletes a device from db

router.delete("/devices/:id", async (req, res, next) => {
  try {
    var result = await devices.deleteDevice(req.params.id);
    res.send(" Successfully Deleted");
    res.status(200).json({
      device: result,
    });
  } catch (err) {
    next(err);
  }
});

// updates the status of device wheter available of not

router.put("/devices/:id", async (req, res, next) => {
  try {
    var result = await devices.updateDevice(req.params.id, req.body);
    res.status(200).json({
      device: result,
      message: "Successfully updated"
    });
  } catch (err) {
    next(err);
  }
});

// creates new device in db

router.post("/devices", async (req, res, next) => {
  try {
    const result = await devices.createDevice(req.body);
    console.log(result);
    res.status(200).json({
      device: result,
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = router;
