// app.js or server.js
const express = require('express');
const serverless = require('serverless-http');
const path = require("path");
const favicon = require('serve-favicon');

const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Adjust favicon path to work in serverless environment
app.use(favicon(path.resolve(__dirname, 'public', 'favicon.ico')));

// Define route to render your main page
app.get("/", (req, res) => {
  res.render("index");
});

// Catch-all route to handle all other paths (404 page)
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

// Define a path for serverless functions
// This is the key path for Netlify to route to your function
app.use('/.netlify/functions/app', (req, res) => {
  res.send("Serverless function is active!"); // For testing
});

// Export serverless handler
module.exports.handler = serverless(app);
