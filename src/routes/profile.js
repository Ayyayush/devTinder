const express = require('express');
const { userAuth } = require("../MiddleWares/auth"); // Import userAuth middleware

const profileRouter = express.Router();

// GET request for user profile
profileRouter.get("/", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;