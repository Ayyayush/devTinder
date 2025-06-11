/*
 * Importing the Express library using require()
 * This allows us to use Express framework functionalities
 */
const express = require("express");

/*
 * Creating an instance of the Express application
 * 'app' will now be used to define routes and start the server
 */
const app = express();

/*
 * Route handler for GET requests made to "/user"
 * Example: http://localhost:7777/user?age=25&city=delhi
 */
app.get("/user", (req, res) => {
  /*
   * Logging the query parameters sent in the URL
   * Example: If URL is /user?age=25, then req.query = { age: '25' }
   * This helps in extracting data from the query string
   */
  console.log(req.query);

  /*
   * Sending a JSON response with first and last name
   * The response will be visible in Postman or the browser as:
   * {
   *   "firstName": "Akshay",
   *   "lastName": "Saini"
   * }
   */
  res.send({ firstName: "Akshay", lastName: "Saini" });
});




// Express.js app ke liye GET route define kiya gaya hai jo userId ko URL parameter ke form me accept karta hai
app.get("/user/:userId", (req, res) => {

    // req.params object me sabhi URL parameters hote hain
    // Yaha hum log userId ko console me print kar rahe hain
    console.log(req.params);                    // eg: agar URL "/user/123" hai toh output hoga { userId: '123' }

    // Response me JSON object bhej rahe hain user ke naam ke sath
    res.send({ firstName: "Akshay", lastName: "Saini" });
});



/*
 * Starting the Express server on port 7777
 * Once the server is running, you can open:
 * http://localhost:7777/user in browser or Postman
 */
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
