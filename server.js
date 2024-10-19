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

const app = express(); // Initialize the app here

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

/* ****************************************
 * Routes
 **************************************** */
app.use(express.static('public')); // Corrected static middleware usage

// Index route
app.get("/", utilities.handleErrors(invController.buildHome));

// Inventory routes
app.use("/inv", inventoryRoute);

// New detailed inventory routes
// Route to vehicle management page
app.get("/inv",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showManagementPage)
);

// Route to build inventory by classification view
app.get("/inv/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to vehicle detail page
app.get("/inv/detail/:invId",
  utilities.handleErrors(invController.buildByVehicleId)
);

// Route to add classification page
app.get("/inv/new-classification",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showAddClassificationPage)
);

// Route to add inventory item page
app.get("/inv/new-inventory",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showAddInventoryPage)
);

// Process the new classification
app.post("/inv/new-classification",
  utilities.checkLogin,
  utilities.checkUserLevel,
  accountValidation.classificationRules(),
  accountValidation.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Process the new inventory item
app.post("/inv/new-inventory",
  utilities.checkLogin,
  utilities.checkUserLevel,
  accountValidation.inventoryRules(),
  accountValidation.checkInventoryData,
  utilities.handleErrors(invController.addInventoryItem)
);

// Account routes
app.use("/account", accountRoute);

// Custom routes for vehicle management
app.get(
  "/management",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showManagementPage)
);

// File not found route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

// Error handling middleware
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  let message;
  if(err.status == 404){ 
    message = err.message;
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?';
  }
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
