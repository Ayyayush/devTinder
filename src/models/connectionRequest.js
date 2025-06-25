
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
  timestamps: true
});

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  // Check if user is trying to send request to themselves
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();    // important to do it here 
});

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;
