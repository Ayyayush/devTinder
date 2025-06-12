/*
 * Importing the Express library using CommonJS syntax.
 * This library allows us to create a web server and manage routing.
 */
const express = require("express");

/*
 * Creating an instance of an Express application.
 */
const app = express();

/*
 * Creating custom middleware handlers (rh1 to rh5).
 * Each middleware logs a message and calls the next() function.
 * The next() function passes control to the next middleware in the stack.
 */

const rh1 = (req, res, next) => {
  console.log("RH1: Handling route /");
  next();
};

const rh2 = (req, res, next) => {
  console.log("RH2: Handling route /");
  next();
};

const rh3 = (req, res, next) => {
  console.log("RH3: Handling route /");
  next();
};

const rh4 = (req, res, next) => {
  console.log("RH4: Handling route /");
  next();
};

const rh5 = (req, res, next) => {
  console.log("RH5: Final handler for route /");
  res.send("Final Response from / route!");
};

/*
 * Attaching multiple middleware functions to the "/" route.
 * This sequence will be executed in order when a request hits "/".
 */
app.use("/", rh1, rh2, rh3, rh4, rh5);

/*
 * Route: "/user"
 * This route has a series of middleware handlers, executed in order.
 * Each handler logs a message and passes control to the next middleware.
 * Only the last one should send a response.
 */
app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user 1!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4!!");
    res.send("Final Response from /user route!!");
  }
);

/*
 * Starting the server on port 3000.
 * This will allow us to access the app at http://localhost:3000
 */
app.listen(7777, () => {
  console.log("Server is running on http://localhost:3000");
});
