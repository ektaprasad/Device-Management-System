async function init() {
  const express = require("express");
  const http = require('http');
  const bodyParser = require("body-parser");
  const dotenv = require('dotenv');
  dotenv.config();
  const cors = require('cors');


  // local module
  const errorHandler = require("./lib/errorHandler");
  const connectDB = require('./lib/connectDB');
  const mountRoutes = require('./mountRoutes')

  // Instanciate express;
  const app = express();
   //enable cors  
    app.use(cors({ exposedHeaders: ["Authorization"] }));
  app.use(bodyParser.json());

  /* 
    connecting to mongodb
  */
  await connectDB();
  // Mounting Routes 
  mountRoutes(app);

  // Handler for errors
  app.use(errorHandler);

  const port = 3000 || process.env.port;
  app.set('port', port);
  const server = http.createServer(app);

  server.listen(port, () => console.log(`app listening on port ${port}!`));

}

// run app
init().catch(e => {
  throw e;
});