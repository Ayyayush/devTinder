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

// Add this middleware to parse JSON bodies
app.use(express.json());

/*
 * Route: POST /signup
 * This route handles the creation of a new user and saves it to the database
 */
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

/*
 * Route: GET /user
 * This route finds a user by email (expects email in query parameter)
 */

/*
 * Route: GET /user
 * Description: Fetch user by email ID sent in request body
 */
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({ emailId: userEmail });

       } catch (err) {
        res.status(400).send("Something went wrong");
    }
});



/*
 * Route: GET /feed
 * Placeholder for feed API
 */
app.get("/feed", async(req, res) => {
  
    try {
        const users = await User.find({});

        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

/*
 * Connect to the database and start the server
 */
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });