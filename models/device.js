const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema for Device
 */
const deviceSchema = new Schema({
  deviceName: {
    type: String,
    required: true,
    trim:true
  },
  os: {
    type: String,
    required: "Operating system required",
    trim:true
  },
  imei:{
    type:String,
    required:true,
    trim:true,
    unique:true,
  },
  extraInfo: {
    type: String,
    trim:true
  },
  isAvailable: {
    type: Boolean,
    default: "true",
    trim:true
  },
  user: {
    type: Schema.Types.ObjectId,
    default: null
  }
});

/**
 * TODO: docs
 */
module.exports = mongoose.model("Device", deviceSchema);
