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
const app = express();

// Route and controller imports
const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute"); // Added require statement for inventoryRoute
const utilities = require('./utilities/index'); // Utilities functions

app.use('/api', inventoryRoute);

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Not at views root

/* ***********************
 * Routes
 *************************/
app.use(static);

/***********************************
* Home, Custom, Sedan, SUV, Truck routes
********************************* */
// All views routes
// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files (like CSS, JS, images)
app.use(express.static('public'));

// Define routes for each page
app.get('/custom', (req, res) => {
    res.render('custom'); // Render custom.ejs
});

app.get('/sedan', (req, res) => {
    res.render('sedan'); // Render sedan.ejs
});

app.get('/suv', (req, res) => {
    res.render('suv'); // Render suv.ejs
});

app.get('/truck', (req, res) => {
    res.render('truck'); // Render truck.ejs
});

// Home page route
app.get('/', (req, res) => {
    res.render('index'); // Render index.ejs
});

//****************************** */
// Index route
app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});

// Inventory routes
app.use("/inv", inventoryRoute); // Now properly linked

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  try {
    let nav = await utilities.getNav(); // Ensure getNav is properly defined and exported in utilities/index.js
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

// Error-handling middleware for all other errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace to the console (for debugging)
  res.status(500).render('errors/error', { title: 'Something Went Wrong', message: err.message });
});

// Last route
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
