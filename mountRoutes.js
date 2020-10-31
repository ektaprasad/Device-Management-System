const deviceRoutes = require("./routes/device");
const authRoutes = require("./routes/auth");

// Mount routes to the app.
module.exports = (app) => {
    app.use("/", deviceRoutes);
    app.use("/", authRoutes);
}