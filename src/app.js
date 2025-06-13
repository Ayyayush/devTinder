/*
 * Importing the Express framework
 * Express is a minimal and flexible Node.js web application framework
 * that provides a robust set of features for web and mobile applications.
 */
const express = require("express");

/*
 * Creating an instance of an Express application.
 * This `app` object will be used to define routes and middleware.
 */
const app = express();

const {adminAuth,userAuth} =require("./MiddleWares/auth");
 

app.use('/admin', adminAuth);
app.use('/admin', userAuth);
/*
 * Middleware: Handle Admin Authentication
 * This middleware will run for all HTTP methods (GET, POST, etc.)
 * that start with the path "/admin" (e.g., "/admin/getAllData", "/admin/deleteUser")
 */
app.use("/admin", (req, res, next) => {
  /*
   * Simulated token received from the client.
   * In a real-world application, retrieve token from headers (e.g., req.headers.authorization)
   */
  const token = "xyzabcdjfhduifh";

  /*
   * Authorization logic: Check if token matches the authorized admin token
   */
  const isAdminAuthorized = token === "xyz";
 
  /*
   * If the token is not valid, send a 401 Unauthorized response
   */
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    /*
     * If authorized, pass control to the next middleware or route handler
     */
    next();
  }
});

/*
 * Route: GET /admin/getAllData
 * This route will be triggered when a GET request is made to /admin/getAllData.
 * Typically used to fetch all data from the server (e.g., from a database).
 */
app.get("/admin/getAllData", (req, res) => {
  /*
   * Admin is already authorized via middleware, so we directly send the data.
   */
  res.send("All Data Sent");
});

/*
 * Route: GET /admin/deleteUser
 * This route simulates deleting users (e.g., from a database).
 * Currently it just sends a placeholder response.
 */
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted Userbase");
});

/*
 * Starting the server on port 7777.
 * Once the server starts, a confirmation message will be logged to the console.
 */
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
