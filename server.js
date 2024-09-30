require("dotenv").config();
const express = require("express");
const app = express();
const utilities = require("./utilities"); // Assuming you have a utilities module
const winston = require("winston");

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

// Static files
app.use(express.static("public"));

// Routes here...

// Catch-all route for 404 errors
app.use((req, res, next) => {
  res.status(404).render('errors/error', { 
    title: 'Page Not Found', 
    message: 'Sorry, the page you are looking for does not exist!' 
  });
});

// Error handling middleware
app.use(async (err, req, res, next) => {
  try {
    let nav = await utilities.getNav();
    logger.error(`Error at: "${req.originalUrl}": ${err.message}`);
    
    const message = err.status === 404 
      ? err.message 
      : 'Oh no! There was a crash. Maybe try a different route?';

    res.status(err.status || 500).render("errors/error", {
      title: err.status || 'Server Error',
      message,
      nav,
    });
  } catch (error) {
    logger.error("Error rendering the error page:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Environment variables with default fallback
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
