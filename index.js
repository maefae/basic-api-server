"use strict";

// Syncing database with server in index.js and where we will start up our server

const { sequelizeDatabase } = require("./src/models/index.js");
const { start } = require("./src/server.js");

sequelizeDatabase
  .sync()
  .then(() => {
    console.log("Successful Conection");
    start();
  })
  .catch((e) => console.error("Could not connect to database", e));
