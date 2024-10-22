const express = require("express");
const app = express();
const path = require("path");

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, etc.)
app.use(express.static("public"));

// Define route to render your main page
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
