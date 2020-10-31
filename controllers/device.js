const Devices = require("../models/device");
// const Router = require("express").Router;
// const router = Router();

exports.getDevice = async () => {
  return await Devices.find({})
};
/*
        @ description save new device into database and throw error if data already exist

*/

exports.createDevice = async data => {
  const device = new Devices(data);
  const docs = await device.save();
  return docs;
};

//search searched device
exports.getSearchedDevice = async data => {
  console.log(data)
  return await Devices.find(
    {$text:{$search:data}}
)
  
};

// Update Status of device

exports.updateDevice = async (id, data) => {
  //Status can be available or blocked
  const updatedValue = {
    isAvailable: data.available,
    user: data.userId
  };

  await Devices.findByIdAndUpdate(
    id,
    { $set: updatedValue },
    { new: true }
  );
};

//deletes a device

exports.deleteDevice = async (id) => {
  return await Devices.findByIdAndRemove(id);
};
