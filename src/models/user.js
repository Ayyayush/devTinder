const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: { // Changed from emailId to email for consistency
        type: String
    },
    password: { // Changed from passWord to password for consistency
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);