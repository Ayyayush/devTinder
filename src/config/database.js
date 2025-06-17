const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://ayushzp159:HUnoHYPwy8qPWUY5@cluster0.fxudxek.mongodb.net/devTinder",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("Database connection is successful");
    } catch (err) {
        console.error("Database could not be connected!!");
        console.error(err); // <-- Add this line
        process.exit(1);
    }
};

module.exports = connectDB;