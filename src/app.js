const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

/*
 * Route: POST /signup
 * This route handles the creation of a new user and saves it to the database
 */
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

/*
 * Route: GET /user
 * This route finds a user by email (expects email in query parameter)
 */
app.get("/user", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).send("Email query parameter is required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.json(user);
  } catch (err) {
    res.status(500).send("Something went wrong: " + err.message);
  }
});

/*
 * Route: DELETE /user
 * This route deletes a user by userId (expects userId in request body)
 */
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).send("userId is required in request body.");
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.send("User deleted successfully.");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

/*
 * Route: PATCH /user/:userId
 * This route updates user data by ID with allowed fields only
 */
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      return res.status(400).json({ success: false, message: "Update not allowed" });
    }

    if (data?.skills?.length > 10) {
      return res.status(400).json({ success: false, message: "Skills cannot be more than 10" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      data,
      {
        new: true,               // ← changed from returnDocument to new
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
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
      return res.status(404).send("No users found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

/*
 * Connect to the database and start the server
 */
connectDB()
  .then(() => {
    console.log("✅ Database connection established...");
    app.listen(7777, () => {
      console.log("🚀 Server is listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
