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
const inventoryRoute = require("./routes/inventoryRoute"); // Ensure this is valid
const utilities = require('./utilities/index'); // Ensure this is valid

app.use('/api', inventoryRoute);

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* ***********************
 * Routes
 *************************/
app.use(static);


// Index route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get('/truck', (req, res) => {
  if (!title) {
      res.redirect('/');
  } else {
      res.render('truck', { title: 'Truck' });
  }
});


// Vehicles routes
app.get('/', (req, res) => {
  const vehicleTypes = [
      { name: 'Custom', link: '/vehicles/custom' },
      { name: 'Sedan', link: '/vehicles/sedan' },
      { name: 'SUV', link: '/vehicles/suv' },
      { name: 'Truck', link: '/vehicles/truck' }
  ];

  // Render the 'index' view and pass the vehicles array to the layout
  res.render('index', { vehicles: vehicleTypes });
});

// Inventory routes
app.use("/inv", inventoryRoute);

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

// Last route
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
