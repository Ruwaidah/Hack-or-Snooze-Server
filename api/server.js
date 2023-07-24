const express = require("express");

const setUpMiddleware = require("./setUpMiddleware.js");
const restrictedMiddleware = require("./restricted-middleware.js");
const server = express();

// middleware
setUpMiddleware(server);

// routers
// USERS
const users = require("../routes/users.js");
server.use("/api/", users);

// STORIES
const stories = require("../routes/stories.js");
server.use("/api/stories", stories);

module.exports = server;

server.get("/", (req, res) => {
  res.status(200).json("WE LIVE");
});
