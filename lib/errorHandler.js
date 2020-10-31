module.exports = function (err, req, res, next) {

  if (err) {
    if (res.headersSent) {
      // end if headers have already been sent
      res.end();
    } else {
      res.status(err.status || 500);
      // send JSON
      res.json({
        isError: true,
        code: err.code || "INTERNAL_ERROR",
        message: err.message
      });
    }
  }
};
