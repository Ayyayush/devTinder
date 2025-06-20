/*
 * Exported Middleware: adminAuth
 * This middleware is responsible for validating admin access.
 * You can import this into any Express route file and use it to protect admin routes.
 */

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "your_jwt_secret_key"; // Use the same secret as in app.js

const adminAuth = (req, res, next) => {
  /*
   * Logging to show that admin middleware is executing
   */
  console.log("Admin auth is getting checked!!");

  /*
   * Simulated token (in real apps, extract from req.headers or req.cookies)
   */
  const token = req.cookies.token; // or from headers

  /*
   * Authorization check: compare token to the expected admin token
   */
  if (token !== "xyz") { // Replace with real admin token logic
    return res.status(401).send("Unauthorized request");
  }
  /*
   * Token is valid, proceed to the next middleware or route handler
   */
  next();
};



const userAuth = async (req, res, next) => {
  // Read the token from thre req cookie

  try{
  const {token}=req.cookies;
  if (!token) {
      return res.status(401).send("No token provided");
    }
  const decodedObj= jwt.verify(token,"JWT_SECRET");

const {userId}=decodedObj;
const user=await User.findById(userId);
  // validate the token

  if(!user)
  {
    throw new Error("User not found");
  }
  next();
}
  catch(err)
  {
    res.status(401).send("Error: " + err.message);
  }

  //Find the user





};











module.exports={
    adminAuth,
    userAuth
}