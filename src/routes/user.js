const express=require("express");
const { userAuth } = require("../MiddleWares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter=express.Router();
const User = require("../models/user");

//get all the pending connection requests for the loggedinUser
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is set by userAuth middleware
    if (!userId) {
      return res.status(400).send("User ID is required.");
    }
    
    const requests = await ConnectionRequest.find({ toUserId: userId, status: "interested" })
      .populate("fromUserId", "firstName lastName photoUrl") // Use actual schema fields
      .exec();
    
    if (!requests || requests.length === 0) {
      return res.status(404).send("No pending connection requests found.");
    }
    
    res.json(requests);
  }
  catch (err) {
    res.status(500).send("Something went wrong: " + err.message);
  } 
});

module.exports = userRouter;

