const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(
            "mongodb+srv://ayushzp159:HUnoHYPwy8qPWUY5@cluster0.fxudxek.mongodb.net/devTinder"
        );
        console.log("Database connection is successful");
    } catch (err) {
        console.error("Database cannot be connected!!");
        console.error(err); // <-- This prints the real error!
        process.exit(1);
    }
};

module.exports = connectDB;