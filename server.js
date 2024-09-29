/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()

// Route and controller imports
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute") // Added require statement for inventoryRoute
const utilities = require('./utilities/index'); // Utilities functions


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // Not at views root


/* ***********************
 * Routes
 *************************/
app.use(static)

// Index route
app.get("/", function(req, res){
  res.render("index", {title: "Home"})
})

// Inventory routes
app.use("/inv", inventoryRoute) // Now properly linked


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST


/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  try {
    let nav = await utilities.getNav() // Ensure getNav is properly defined and exported in utilities/index.js
    console.error(`Error at: "${req.originalUrl}": ${err.message}`)
    res.status(err.status || 500).render("errors/error", {
      title: err.status || 'Server Error',
      message: err.message,
      nav
    })
  } catch (error) {
    console.error("Error rendering the error page:", error)
    res.status(500).send("An unexpected error occurred.")
  }
})


/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
