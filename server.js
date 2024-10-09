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
const path = require('path');

// Route and controller imports
const static = require("./routes/static");
const inventoryRoute = require("./routes/inventoryRoute"); // Ensure this is valid
const utilities = require('./utilities/index'); // Ensure this is valid
const motorsRoutes = require('./routes/motorsRoutes');
const sedanRoutes = require('./routes/sedan'); 
const suvRoutes = require('./routes/suv');
const { buildNavigation } = require('./controllers/navController');
app.use('/api', inventoryRoute);

///////////////Main Application Building Application/////////////
// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Home page route
app.get('/', async (req, res) => {
    try {
        const navItems = await buildNavigation();
        res.render('home', { navItems });
    } catch (error) {
        res.status(500).send('Error loading the Home page');
    }
});

// Custom page route
app.get('/custom', async (req, res) => {
    try {
        const navItems = await buildNavigation();
        res.render('custom', { navItems });
    } catch (error) {
        res.status(500).send('Error loading the Custom page');
    }
});

// Sedan page route
app.get('/sedan', async (req, res) => {
    try {
        const navItems = await buildNavigation();
        res.render('sedan', { navItems });
    } catch (error) {
        res.status(500).send('Error loading the Sedan page');
    }
});

// SUV page route
app.get('/suv', async (req, res) => {
    try {
        const navItems = await buildNavigation();
        res.render('suv', { navItems });
    } catch (error) {
        res.status(500).send('Error loading the SUV page');
    }
});

// Trucks page route
app.get('/trucks', async (req, res) => {
    try {
        const navItems = await buildNavigation();
        res.render('trucks', { navItems });
    } catch (error) {
        res.status(500).send('Error loading the Trucks page');
    }
});

/////////////
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
/* ***************** */
///
app.use(express.static(path.join(__dirname, 'public')));
///
// Index route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
// CUSTOME/////////////////
// Set EJS as the templating engine
// Import the motors route (Ensure this path is correct based on your file structure) // Adjust path as needed

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the motors route
app.use('/motors', motorsRoutes);

// Basic homepage route (Optional)
app.get('/', (req, res) => {
  res.render("index", { title: "Home" });
});
////////////
// sedan////////////////
 // Import the sedan routes
app.set('view engine', 'ejs');
app.set('views', './views'); // Set the views directory
app.use('/', sedanRoutes); // Use the sedan routes
////////////////////////
// Inventory routes
app.use("/inv", inventoryRoute);

/////////////SUV////////////////////
// Import the SUV routes
app.set('view engine', 'ejs');
app.set('views', './views'); // Set the views directory
app.use('/', suvRoutes); // Use the SUV routes

////////////////////////////////////

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
