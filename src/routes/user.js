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



userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinUserId = req.user._id; // Assuming req.user is set by userAuth middleware
    if (!loggedinUserId) {  
      return res.status(400).send("User ID is required.");
    }       
    // Find all connections where the logged-in user is either the fromUserId or toUserId
    const connections = await ConnectionRequest.find({              
        $or: [
            { fromUserId: loggedinUserId, status: "accepted" },
            { toUserId: loggedinUserId, status: "accepted" }
        ]
        })      
        .populate("fromUserId", "firstName lastName photoUrl") // Use actual schema fields      
        .populate("toUserId", "firstName lastName photoUrl") // Use actual schema fields
        .exec();    
    if (!connections || connections.length === 0) {
      return res.status(404).send("No connections found."); 
    }
    res.json(connections);
  } catch (err) {                           
    res.status(500).send("Something went wrong: " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find all connection requests involving the logged-in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedinUserId },
        { toUserId: loggedinUserId }
      ]
    }).select("fromUserId toUserId");

    // Extract user IDs that should be excluded from feed
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach(req => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // Find users not in the excluded list and not the logged-in user
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedinUserId } }
      ]
    })
    .select("firstName lastName photoUrl age gender about skills")
    .skip(skip)
    .limit(limit);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found in feed." });
    }

    res.json({ data: users, page, limit });
  } catch (err) {
    res.status(500).send("Something went wrong: " + err.message);
  }
});

module.exports = userRouter;

