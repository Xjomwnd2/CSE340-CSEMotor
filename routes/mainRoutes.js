const express = require('express');
const router = express.Router();

// Route and controller imports
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./inventoryRoute"); // Ensure this is valid
const utilities = require('./utilities/index'); // Ensure this is valid
const motorsRoutes = require('./motorsRoutes'); // Adjust path as needed
const customRoutes = require('./customRoutes'); // Adjust path as needed
const sedanRoutes = require('./sedanRoutes'); // Adjust path as needed
const suvRoutes = require('./suvRoutes'); // Adjust path as needed
const truckRoutes = require('./truckRoutes'); // Adjust path as needed
const baseController = require('../controllers/baseController'); // Adjust path if needed


// Use the routes
router.use('/api', inventoryRoute); // Inventory API
router.use('/motors', motorsRoutes); // Motors routes
router.use('/', customRoutes); // Custom routes
router.use('/', sedanRoutes); // Sedan routes
router.use('/', suvRoutes); // SUV routes
router.use('/', truckRoutes); // Truck routes

module.exports = router;
