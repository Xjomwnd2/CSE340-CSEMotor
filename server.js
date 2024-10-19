/******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
require('dotenv').config(); // Load environment variables
const express = require('express');
const router = new express.Router();
const invController = require("../controllers/invControllers.js");
const path = require('path');
console.log(path.resolve(__dirname, './controllers/invControllers.js'));
const invController = require("./controllers/invControllers.js");


const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const { Pool } = require('pg');  // PostgreSQL module
const path = require('path');
const pgSession = require('connect-pg-simple')(session);
const app = express(); // Initialize the app here
// Set up the connection pool for PostgreSQL
/////////////////////////mahoya///////////////////////
// Database configuration
const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432,  // Or any other port you configured
});
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
///////////////////////////////////////////////////////////////////
// Test the connection by querying the database
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('PostgreSQL connected successfully at:', res.rows[0].now);
  }
  pool.end(); // Close the connection after the test query
});
////////////////////session is working/////////////////
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
/* ****************************************
	*Routes
**************************************** */
App.use(static);
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory route
app.use("/inv", inventoryRoute)
// Account Route
app.use("/account", accountRoute)
// File not found route
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

/////////////////////////// Routes to vehicle management /////////////////////////////////////
router.get(
  "/",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showManagementPage)
)

router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByVehicleId)
)

router.get(
  "/new-classification",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.buildNewClassification)
)
///////////////////////
//////////////////////////////////////////////////////////////////////
// Custom Route - Display custom items

// Last route

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
