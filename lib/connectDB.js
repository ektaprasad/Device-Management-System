const Promise = require('bluebird')
const mongoose = require('mongoose');
/**
 * Connect to mongodb
 */
module.exports = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    const MONGO_URI = process.env.MONGO_URI;

    const conn = await mongoose.connect(MONGO_URI, options)
    mongoose.Promise = Promise;
    return conn;
}