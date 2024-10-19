/******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const { Pool } = require('pg');  // PostgreSQL module
const pgSession = require('connect-pg-simple')(session);
const utilities = require('./utilities'); 
const invController = require("../controllers/invControllers.js");
const inventoryRoute = require("./routes/inventoryRoute"); // Import your inventory routes
const accountRoute = require("./routes/accountRoute"); // Import your account routes
const accountValidation = require('./utilities/account-validation');

const app = express(); // Initialize the app here

// Set up the connection pool for PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER, // Use environment variables for sensitive data
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,  // Use environment variable or default port
});

// Test the database connection
async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release();  // Always release the client back to the pool
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}
testDatabaseConnection();

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Pool has ended');
    process.exit(0);
  });
});

// Middleware Setup
app.use(flash()); // Flash middleware
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, images, etc.)
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set views directory

// Middleware for session management
app.use(session({
  store: new pgSession({
    pool: pool, // Use the existing connection pool
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'sessionId',
}));

// Middleware to make flash messages available in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

/* ****************************************
 * Validation Middleware
 **************************************** */
// In validation.js (middleware)
const { check } = require('express-validator');
// Middleware to validate the classification name (no spaces or special characters)
exports.checkClassificationData = [
  check('classificationName')
    .trim()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Classification name must not contain spaces or special characters'),
];

/* ****************************************
 * Routes
 **************************************** */
app.use("/inv", inventoryRoute); // Inventory routes
app.use("/account", accountRoute); // Account routes

// Index route
app.get("/", utilities.handleErrors(invController.buildHome));

// Custom routes for vehicle management
app.get(
  "/management",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showManagementPage)
);

// New detailed inventory routes
app.get("/inv",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showManagementPage)
);
app.get("/inv/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);
app.get("/inv/detail/:invId",
  utilities.handleErrors(invController.buildByVehicleId)
);
app.get("/inv/new-classification",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showAddClassificationPage)
);
app.get("/inv/new-inventory",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showAddInventoryPage)
);

// Process the new classification
app.post("/inv/new-classification",
  utilities.checkLogin,
  utilities.checkUserLevel,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Process the new inventory item
app.post("/inv/new-inventory",
  utilities.checkLogin,
  utilities.checkUserLevel,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventoryItem)
);

// File not found route - must be the last route in the list
app.use((req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

// Error handling middleware
app.use(async (err, req, res, next) => {
  const nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  const message = err.status === 404 
    ? err.message 
    : 'Oh no! There was a crash. Maybe try a different route?';

  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  });
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
