/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const path = require('path');
const app = express();

// Route and controller imports
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute"); // Ensure this is valid
const utilities = require('./utilities/index'); // Ensure this is valid
const motorsRoutes = require('./routes/motorsRoutes'); // Adjust path as needed
const sedanRoutes = require('./routes/sedanRoutes'); // Adjust path as needed
const suvRoutes = require('./routes/suvRoutes'); // Adjust path as needed

// Middleware
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

/* ***********************
 * Routes
 *************************/
// Use the routes
app.use('/api', inventoryRoute); // Inventory API
app.use('/motors', motorsRoutes); // Motors routes
app.use('/', sedanRoutes); // Sedan routes
app.use('/', suvRoutes); // SUV routes

// Basic homepage route
app.get('/', (req, res) => {
  res.render("index", { title: "Home" });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5500; // Fallback port if not defined
const host = process.env.HOST || 'localhost'; // Fallback host if not defined

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  try {
    let nav = await utilities.getNav(); // Ensure this function exists
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    res.status(err.status || 500).render("errors/error", {
      title: err.status || 'Server Error',
      message: err.message,
      nav
    });
  } catch (error) {
    console.error("Error rendering the error page:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Catch-all 404 handler for any routes that don't match
app.use((req, res, next) => {
  res.status(404).render('errors/error', { title: 'Page Not Found', message: 'Sorry, the page you are looking for does not exist!' });
});

// Last route for handling other errors
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
