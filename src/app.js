const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Define your JWT secret key here (not inside any function)
const JWT_SECRET = "your_jwt_secret_key";

// Signup Route (unchanged)
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// Login Route (corrected)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    // Use the JWT_SECRET here
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true if using HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.send("Login Successful!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// ...other routes and server start code...


app.get("/profile", async (req, res) => {
    const cookies = req.cookies;

    const { token } = cookies;
    // Validate my token
    const decodedMessage = await jwt.verify(token, "DEVETinder$790");
    const { _id }=decodedMessage;
    console.log("Logged in user is: "+ _id);
    console.log= await User.findById(userId);

    console.log(decodedMessage);
    console.log(cookies);

    res.send("Reading Cookie");
});



// Get User by Email
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

// Delete User by userId
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

// Update User by userId
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
        new: true,
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

// Get all users (Feed)
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

// Connect to the database and start the server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
        console.error("Database cannot be connected!!");
    console.error(err);
  });