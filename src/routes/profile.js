const express = require('express');
const { userAuth } = require("../MiddleWares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

// GET request for user profile
profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// PATCH request to edit user profile
profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    // Validate the input data - this will throw an error if invalid
    validateEditProfileData(req);

    const loggedInUser = req.user;
    
    // Update the user with validated fields
    Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });

    await loggedInUser.save();
    
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });

  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;