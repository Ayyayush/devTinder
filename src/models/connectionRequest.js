const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['ignored', 'interested', 'accepted', 'rejected'],
    message: '{VALUE} is incorrect status type'
  }
}, {
  timestamps: true,
});

// Add compound index for better query performance on connection requests
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
connectionRequestSchema.index({ toUserId: 1, fromUserId: 1 }); // For reverse lookups

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  // Check if user is trying to send request to themselves
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();    // important to do it here 
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
