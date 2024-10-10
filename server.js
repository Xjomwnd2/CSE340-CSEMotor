/******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
const session = require("express-session")
const pool = require('./database/')
/* ***********************
 * Require Statements
 *************************/
const bodyParser = require("body-parser")
/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}
/* ****************************************
*  Deliver login view
* *************************************** */
// Import required modules

const app = express();

// Assuming utilities.js is in the same directory
const utilities = require('./utilities/utilities'); // Adjust the path as needed

const express = require('express');
const { Pool } = require('pg');  // PostgreSQL module
const path = require('path');
// Set up the connection pool for PostgreSQL
const pool = new Pool({
  user: 'your_pg_user',  // Your PostgreSQL user
  host: 'localhost',      // PostgreSQL host
  database: 'motors_db',  // Your database name
  password: 'your_password', // Your database password
  port: 5432,             // PostgreSQL port
}); // */

// Middleware to parse JSON bodies
app.use(express.json());

// bodyPasser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Motors API!');
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

// Middleware
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files (CSS, images, etc.)
app.set('view engine', 'ejs');  // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));  // Set views directory
// Home Route
app.get('/', (req, res) => {
  res.render('index', { title: 'CSE340 Motors Home' });
});
// Inventory Route - Display inventory items from the database
app.get('/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory');  // Query the inventory table
    const items = result.rows;  // Fetch all rows
    res.render('inventory', { title: 'Inventory List', items });  // Render the view and pass data
  } catch (err) {
    console.error('Error fetching inventory:', err);
    res.status(500).send('Server Error');
  }
});
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
/* **********************************
 * View Engine and Templates
*************************************/


/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))
/* **********************************
 * Local Server Information
 * Values from .env (environment) file
 ************************************/
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

