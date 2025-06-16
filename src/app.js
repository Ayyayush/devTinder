/*
 * Importing required modules
 */
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

/*
 * Creating an Express app instance
 */
const app = express();

/*
 * Route: POST /signup
 * This route handles the creation of a new user and saves it to the database
 */
app.post("/signup", async (req, res) => {
  /*
   * Creating a new instance of the User model
   */
  const user = new User({
    firstName: "Ayyyush",
    lastName: "Pandey",
    email: "ayushpandey.com",
    password: "ayush@123"
   
  });

  /*
   * Saving the user to the database
   */
  await user.save();

  /*
   * Sending response after successful creation
   */
  res.send("User Added successfully!");
});

/*
 * Connecting to the database
 */
connectDB()
  .then(() => {
    console.log("Database connection established...");

    /*
     * Starting the server after DB is connected successfully
     */
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    /*
     * Handling DB connection failure
     */
    console.error("Database cannot be connected!!");
  });
