const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../MiddleWares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Validate allowed status values
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ error: "Invalid status type: " + status });
      }

      // Check if user is trying to send request to themselves
      if (fromUserId.toString() === toUserId) {
        return res
          .status(400)
          .json({ error: "Cannot send connection request to yourself!" });
      }

      // Check if toUserId exists in database
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ error: "User not found!" });
      }

      // Check if connection request already exists
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ error: "Connection request already exists!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      // Send appropriate message based on status
      const statusMessage = status === "interested" ? "sent" : status;
      res.json({
        message: `${req.user.name} ${statusMessage} ${toUser.name} successfully!`,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:fromUserId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.user._id;
      const fromUserId = req.params.fromUserId;
      const status = req.params.status;

      // Validate allowed status values
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ error: "Invalid status type: " + status });
      }

      // Check if connection request exists
      const connectionRequest = await ConnectionRequest.findOne({
        fromUserId,
        toUserId,
        status: "interested", // Only review requests that are interested
      });

      if (!connectionRequest) {
        return res.status(404).json({ error: "Connection request not found!" });
      }

      // Update the status of the connection request
      connectionRequest.status = status;
      const updatedRequest = await connectionRequest.save();

      // Send appropriate message based on status
      const statusMessage = status === "accepted" ? "accepted" : "rejected";
      res.json({
        message: `${req.user.name} has ${statusMessage} the connection request from ${fromUserId}!`,
        data: updatedRequest,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
