/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express")

const app = express()
/* ******************************************
 * Default GET route
 * ***************************************** */
app.get("/", (req, res) => {res.send("Welcome home!")})


/* ******************************************
 * Server host name and port
 * ***************************************** */
c

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
/* ***********************
 * Log statement to confirm server operation
 *************************/
const PORT = process.env.PORT || 5500; // Ensure there's a default port
app.listen(PORT, () => {
  console.log(`app listening on localhost:${PORT}`);
});
