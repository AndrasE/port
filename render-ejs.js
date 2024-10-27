const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

// Path to the EJS file you want to render
const templatePath = path.join(__dirname, "views", "index.ejs");

// Path to save the rendered HTML output
const outputPath = path.join(__dirname, "public", "index.html");

// Read the EJS template file
fs.readFile(templatePath, "utf8", (err, template) => {
  if (err) {
    console.error("Error reading EJS template file:", err);
    return;
  }

  // Render EJS into HTML (you can pass any variables if needed)
  const htmlContent = ejs.render(template, {
    // Add any variables here if needed
  });

  // Write the rendered HTML to the output file
  fs.writeFile(outputPath, htmlContent, (err) => {
    if (err) {
      console.error("Error writing rendered HTML file:", err);
    } else {
      console.log(`Successfully rendered and saved: ${outputPath}`);
    }
  });
});
