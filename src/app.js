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

/*
 * Route: GET /getUserData
 * Description: Simulates a DB call and intentionally throws an error.
 */
app.get("/getUserData", (req, res) => {
  /*
   * Simulate an error occurring during the DB call
   */
  throw new Error("dvbzhjf");

  /*
   * This line will never execute due to the error thrown above
   */
  res.send("User Data Sent");
});

/*
 * Error-handling middleware
 * This catches any error thrown from the routes above and handles them centrally.
 */
app.use((err, req, res, next) => {
  /*
   * Check if an error object exists and respond with a 500 status code
   * along with a generic error message
   * log your error
   */
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

/*
 * Route: GET /user
 * Description: A simple route that returns a success response.
 */
app.get("/user", (req, res) => {
  res.send("User Data Sent");
});

/*
 * Start the server on port 7777.
 * Once the server is up and running, log a message to the console.
 */
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
