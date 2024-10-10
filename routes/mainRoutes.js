const express = require('express');
const router = express.Router();

// Route and controller imports
const baseController = require('../controllers/baseController'); // Adjust path if needed
const inventoryRoute = require("./inventoryRoute"); // Ensure this is valid
const utilities = require('../utilities/index'); // Adjust the path if needed
const motorsRoutes = require('./motorsRoutes'); // Adjust path as needed
const customRoutes = require('./customRoutes'); // This should be the correct path if in the same folder
const sedanRoutes = require('./sedanRoutes'); // Adjust path as needed
const suvRoutes = require('./suvRoutes'); // Adjust path as needed
const truckRoutes = require('./truckRoutes'); // Adjust path as needed


// Use the routes
router.use('/api', inventoryRoute); // Inventory API
router.use('/motors', motorsRoutes); // Motors routes
router.use('/', customRoutes); // Custom routes
router.use('/', sedanRoutes); // Sedan routes
router.use('/', suvRoutes); // SUV routes
router.use('/', truckRoutes); // Truck routes

module.exports = router;
