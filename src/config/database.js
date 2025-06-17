const mongoose = require('mongoose');





const connectDB = async () => {
    
        await mongoose.connect(
            "mongodb+srv://ayushzp159:@cluster0.fxudxek.mongodb.net/devTinder",
        );
    };

module.exports=connectDB;


