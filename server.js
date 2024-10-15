/******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const { Pool } = require('pg');  // PostgreSQL module
const path = require('path');
const utilities = require('./utilities/utilities'); // Adjust the path as needed


//const pool = require('./database/');

// Initialize express app
const app = express();

// Define port, either from environment or default to 10000


// Define your routes, middleware, etc.

// Set up the connection pool for PostgreSQL
// Comment this out if you are using the pool from your database module
/* const pool = new Pool({
  user: 'your_pg_user',  // Your PostgreSQL user
  host: 'localhost',      // PostgreSQL host
  database: 'motors_db',  // Your database name
  password: 'your_password', // Your database password
  port: 5432,             // PostgreSQL port
}); */

// Set up session middleware
app.use(session({
  secret: 'yourSecretKey', // Replace with your own secret key
  resave: false, // Set to true if you want to force the session to be saved back to the store
  saveUninitialized: true, // Save uninitialized sessions
  cookie: { secure: false } // If you're not using HTTPS, set secure to false
}));
////////////////////session is working/////////////////

////////////////10000//////////////////////////////

//////////////////////////////////////////////////
// Flash middleware
app.use(flash());

// Middleware to make flash messages available in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});
/////////////////////////////////////*/
// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for session management
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}));

/* ************************************************
Validation Middleware
************************************************* */
// In validation.js (middleware)
const { check } = require('express-validator');
// Middleware to validate the classification name (no spaces or special characters)
exports.checkClassificationData = [
  check('classificationName')
    .trim()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Classification name must not contain spaces or special characters'),
];
/////////////////////////////////////////////////////////////////
// Sample route
app.get('/', (req, res) => {
  res.render('index', { title: 'CSE340 Motors Home' });
});
// Example route for querying the database
app.get('/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Internal Server Error');
  }
});
// Inventory Route - Display inventory items from the database
app.get('/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory');
    const items = result.rows;
    res.render('inventory', { title: 'Inventory List', items });
  } catch (err) {
    console.error('Error fetching inventory:', err);
    res.status(500).send('Server Error');
  }
});

//////////////////////////////////////////////////////////////////////

// Custom Route - Display custom items
app.get('/inventory/custom', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE category = 'Custom'");
    const custom = result.rows;
    res.render('custom', { title: 'Custom Collection', custom });
  } catch (err) {
    console.error('Error fetching custom items:', err);
    res.status(500).send('Server Error');
  }
});

// Sedan Route - Display sedan-specific items
app.get('/inventory/sedan', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE category = 'Sedan'");
    const sedan = result.rows;
    res.render('sedan', { title: 'Sedan Collection', sedan });
  } catch (err) {
    console.error('Error fetching sedan:', err);
    res.status(500).send('Server Error');
  }
});

// SUV Route - Display SUV-specific items
app.get('/inventory/suv', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE category = 'SUV'");
    const suv = result.rows;
    res.render('suv', { title: 'SUV Collection', suv });
  } catch (err) {
    console.error('Error fetching SUV:', err);
    res.status(500).send('Server Error');
  }
});

// Truck Route - Display truck-specific items
app.get('/inventory/trucks', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE category = 'Truck'");
    const trucks = result.rows;
    res.render('trucks', { title: 'Trucks Collection', trucks });
  } catch (err) {
    console.error('Error fetching trucks:', err);
    res.status(500).send('Server Error');
  }
});

// Express Error Handler
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
app.use((req, res) => {
  res.status(404).render('errors/error', { title: 'Page Not Found', message: 'Sorry, the page you are looking for does not exist!' });
});

// Last route
app.use((req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* **********************************
 * Local Server Information
 * Values from .env (environment) file
 ************************************/
const port = process.env.PORT || 5500; // Fallback port if not defined
const host = process.env.HOST || 'localhost'; // Fallback host if not defined
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
// Only one listen call to use port 5500
