const express = require("express");

const app = express();

// Middleware handling ALL incoming requests (GET, POST, etc.)

app.use("/ayush" ,(req, res) => {
  res.send("Hello sexyyyyy!");
});



app.use("/pandey" ,(req, res) => {
  res.send("Hello from the server!");
});


app.listen(7777, () => {
  console.log("server is successfully listening on port 7777...");
});
 