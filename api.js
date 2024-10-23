// server.js or api.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require("path");


// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "public")));


// Define route to render your main page
app.get("/", (req, res) => {
  res.render("index");
});

// Catch-all route to handle all other paths (404 page)
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

// Define a path for serverless functions
app.use('/.netlify/functions/api', (req, res) => {
  res.send('Serverless Function is working!');
});

// Export serverless handler
module.exports.handler = serverless(app);
