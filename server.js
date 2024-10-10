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
const mainRoutes = require('./routes/mainRoutes'); 

//Navigation
// Define your navigation items
const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Custom', link: '/custom' },
  { name: 'Sedan', link: '/sedan' },
  { name: 'SUV', link: '/suv' },
  { name: 'Truck', link: '/trucks' }
];

// Home route
app.get('/', (req, res) => {
  res.render('index', { navItems });
});
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

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
// Other middleware and configurations...

// Use the centralized router
app.use(mainRoutes);

// Start your server
// Basic homepage route
app.get('/', (req, res) => {
  res.render("index", { title: "Home" });
});

//inventory routes
// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (for images, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Load vehicle data from JSON file
const vehicles = JSON.parse(fs.readFileSync('./data/vehicles.json'));

// Route for the home page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to CSE Motors</h1>');
});

// Dynamic route for vehicle details
app.get('/vehicle/:id', (req, res) => {
  const vehicleId = req.params.id;
  const vehicle = vehicles[vehicleId];

  if (vehicle) {
    res.render('vehicle', { vehicle });
  } else {
    res.status(404).send('Vehicle not found');
  }
});

// Route to display all vehicles in inventory
app.get('/inventory', (req, res) => {
  res.render('inventory', { vehicles });
});
////////////////
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
