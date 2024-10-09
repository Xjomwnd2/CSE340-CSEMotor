/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require('path');
const baseController = require("./controllers/baseController");
const staticRoutes = require('./routes/static');
const staticRoutes = require('./anotherFolder/static');


// Route and controller imports
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require('./utilities/index');

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

// Use the static route
app.use('/static', staticRoutes);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Inventory routes
app.use("/inv", inventoryRoute);

// Index route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 5500;
const host = process.env.HOST || 'localhost';

/* ***********************
 * Express Error Handler
 *************************/
app.use(async (err, req, res, next) => {
  try {
    let nav = await utilities.getNav();
    res.status(err.status || 500).render("errors/error", { title: 'Server Error', message: err.message, nav });
  } catch (error) {
    res.status(500).send("An unexpected error occurred.");
  }
});

// Catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).render('errors/error', { title: 'Page Not Found', message: 'Sorry, the page you are looking for does not exist!' });
});

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
