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
const { Pool } = require('pg'); // PostgreSQL module
const pgSession = require('connect-pg-simple')(session);
const utilities = require('./utilities'); 
const invController = require("../controllers/invControllers.js");
const inventoryRoute = require("./routes/inventoryRoute"); // Import your inventory routes
const accountRoute = require("./routes/accountRoute"); // Import your account routes
const accountValidation = require('./utilities/account-validation');

// Create a new Pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Initialize the Express app
const app = express(); 

// Flash middleware
app.use(flash());
// Middleware to make flash messages available in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for session management
app.use(session({
  store: new pgSession({
    pool: pool, // Use the new connection pool
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'sessionId',
}));

// Add your routes here
// For example, index route
app.get("/", utilities.handleErrors(invController.buildHome));

// Inventory routes
app.use("/inv", inventoryRoute);

// Other routes...

// File not found route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

// Error handling middleware
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message || 'Oh no! There was a crash. Maybe try a different route?',
  });
});

// Local Server Information
const port = process.env.PORT || 5500; // Fallback port if not defined
const host = process.env.HOST || 'localhost'; // Fallback host if not defined
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
