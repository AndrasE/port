// src/api.js or src/server.js (adjust naming as needed)
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require("path");
const favicon = require('serve-favicon');

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Adjust path as needed

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "../public")));
app.use(favicon(path.join(__dirname, '../public/images', 'favicon.ico')));

// Define route to render your main page
app.get("/", (req, res) => {
  res.render("index");
});

// Define a path for serverless functions
app.use('/.netlify/functions/api', (req, res) => {
  res.send('Serverless Function is working!');
});

module.exports.handler = serverless(app);
