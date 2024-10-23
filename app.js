const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const path = require("path");
const favicon = require('serve-favicon')

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, etc.)
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, 'public//images', 'favicon.ico')))

// Define route to render your main page
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);