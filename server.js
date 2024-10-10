// Import required modules
const express = require('express');
const { Pool } = require('pg');  // PostgreSQL module
const path = require('path');
const app = express();

// Set up the connection pool for PostgreSQL
const pool = new Pool({
  user: 'your_pg_user',  // Your PostgreSQL user
  host: 'localhost',     // PostgreSQL host
  database: 'motors_db', // Your database name
  password: 'your_password', // Your database password
  port: 5432,            // PostgreSQL port
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


// Middleware
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files (CSS, images, etc.)
app.set('view engine', 'ejs');  // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));  // Set views directory

// Home Route
app.get('/', (req, res) => {
  res.render('home', { title: 'CSE340 Motors Home' });
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

// Custom Route - Display sedan-specific items
app.get('/inventory/sedans', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE category = 'Custom'");
    const custom = result.rows;
    res.render('custom', { title: 'custom Collection', custom });
  } catch (err) {
    console.error('Error fetching sedans:', err);
    res.status(500).send('Server Error');
  }
});

// Sedan Route - Display sedan-specific items
app.get('/inventory/sedans', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE category = 'Sedan'");
    const sedans = result.rows;
    res.render('sedans', { title: 'Sedans Collection', sedans });
  } catch (err) {
    console.error('Error fetching sedans:', err);
    res.status(500).send('Server Error');
  }
});

// SUV Route - Display SUV-specific items
app.get('/inventory/suvs', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE category = 'SUV'");
    const suvs = result.rows;
    res.render('suvs', { title: 'SUVs Collection', suvs });
  } catch (err) {
    console.error('Error fetching SUVs:', err);
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

// Electric Route - Display electric vehicles
app.get('/inventory/electric', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE category = 'Electric'");
    const electric = result.rows;
    res.render('electric', { title: 'Electric Cars Collection', electric });
  } catch (err) {
    console.error('Error fetching electric vehicles:', err);
    res.status(500).send('Server Error');
  }
});


/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});