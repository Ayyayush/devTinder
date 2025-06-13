/*
 * Exported Middleware: adminAuth
 * This middleware is responsible for validating admin access.
 * You can import this into any Express route file and use it to protect admin routes.
 */
 const adminAuth = (req, res, next) => {
  /*
   * Logging to show that admin middleware is executing
   */
  console.log("Admin auth is getting checked!!");

  /*
   * Simulated token (in real apps, extract from req.headers or req.cookies)
   */
  const token = "xyz";

  /*
   * Authorization check: compare token to the expected admin token
   */
  const isAdminAuthorized = token === "xyz";

  /*
   * If token is invalid, block the request with a 401 Unauthorized response
   */
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    /*
     * Token is valid, proceed to the next middleware or route handler
     */
    next();
  }
};



 const userAuth = (req, res, next) => {
  /*
   * Logging to show that admin middleware is executing
   */
  console.log("Admin auth is getting checked!!");

  /*
   * Simulated token (in real apps, extract from req.headers or req.cookies)
   */
  const token = "xyz";

  /*
   * Authorization check: compare token to the expected admin token
   */
  const isAdminAuthorized = token === "xyz";

  /*
   * If token is invalid, block the request with a 401 Unauthorized response
   */
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    /*
     * Token is valid, proceed to the next middleware or route handler
     */
    next();
  }
};











module.exports={
    adminAuth,
    userAuth
}