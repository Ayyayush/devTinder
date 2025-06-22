const express = require("express");
const User = require("../models/user"); // Fixed path
const { userAuth } = require("../MiddleWares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", async (req, res) => {
  console.log("Sending a connection request");
  res.send("Connection Request Sent");
});

module.exports = requestRouter; // Use CommonJS export