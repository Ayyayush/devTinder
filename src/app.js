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

// app.post("/signup", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.send("User Added successfully!");
//   } catch (err) {
//     res.status(400).send("Error saving the user: " + err.message);
//   }
// });



/*
 * Route: GET /user
 * This route finds a user by email (expects email in query parameter)
//  */
// app.get("/user", async (req, res) => {
//   try {
//     const email = req.query.email;
//     if (!email) {
//       return res.status(400).send("Email query parameter is required.");
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).send("User not found.");
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//   }
// });





/*
 * Route: DELETE /user
 * This route deletes a user by email (expects email in body)
 */
app.delete("/user", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).send("email is required in request body.");
    }
    const user = await User.findByIdAndDelete(email);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});


/*
 * Route: PATCH /user
 * Description: Update data of the user using their email from request body
 */
app.patch("/user", async (req, res) => {
    const email = req.body.email;
    const data = req.body;

    try {
        await User.findByIdAndUpdate({ _id: email }, data);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});


/*
 * Route: GET /feed
 * Returns all users
 */
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
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