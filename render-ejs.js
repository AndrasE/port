const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "views", "index.ejs");
const outputPath = path.join(__dirname, "public", "index.html");

fs.readFile(templatePath, "utf8", (err, template) => {
  if (err) {
    console.error("Error reading EJS template file:", err);
    return;
  }

  const options = {
    root: path.join(__dirname, "views"),
  };

  const htmlContent = ejs.render(template, {}, options);

  fs.writeFile(outputPath, htmlContent, (err) => {
    if (err) {
      console.error("Error writing rendered HTML file:", err);
    } else {
      console.log(`Successfully rendered and saved: ${outputPath}`);
    }
  });
});
