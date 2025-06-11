/*
 * Importing the Express library using require
 */
const express = require("express");

/*
 * Creating an Express application instance
 */
const app = express();



/*
 * Route 1: Matches any path that starts exactly with "/hello/2"
 * Example match: /hello/2, /hello/2/abc
 * ❌ Will NOT match: /hello/123, /hello/world, etc.
 */
app.use("/hello/2", (req, res) => {
  res.send("Abracadabra!");
});



/*
 * Route 2: Matches any path that starts with "/hello"
 * Example match: /hello, /hello/world, /hello/2
 * 
 * ⚠️ NOTE: This will match /hello/2 also, so if this route is placed 
 * above "/hello/2", it will take precedence due to order.
 */
app.use("/hello", (req, res) => {
  res.send("Hello hello hello!");
});




/*
 * This will only handle GET requests made to the "/user" route
 * 
 * ✅ GET is method-specific. It will not respond to POST/PUT/etc.
 * Example: http://localhost:PORT/user
 */

app.get("/user1", (req, res) => {
  console.log("GET /user hit");
  res.send({ firstName: "Akshay", lastName: "SainiGet" });
});



app.post("/user2", (req, res) => {
  console.log("Saved database");
  res.send({ firstName: "Akshay", lastName: "SainiPost" });
});




app.delete("/user3", (req, res) => {
  console.log("Deleted database");
  res.send({ firstName: "Akshay", lastName: "SainiDelete" });
});


/*
 * Route 3: Matches any path that starts with "/test"
 * Example match: /test, /test/data
 */
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

/*
 * Route 4: Catch-all route for root path "/"
 * This will match anything if no route matches above
 */
app.use("/", (req, res) => {
  res.send("Namaste Akshay!");
});

/*
 * Starting the server on port 7777
 */
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
