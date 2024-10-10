// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController'); // Ensure this path is correct
const inventoryRoute = require('./inventoryRoute'); // Check this too
const motorsRoutes = require('./motorsRoutes'); // Check this too
const customRoutes = require('./customRoutes'); // This line should match the actual file name
const sedanRoutes = require('./sedanRoutes'); // Check this too
const suvRoutes = require('./suvRoutes'); // Check this too
const truckRoutes = require('./truckRoutes'); // Check this too
const utilities = require('../utilities/index'); // Ensure this path is correct

// Use the routes
router.use('/api', inventoryRoute); // Inventory API
router.use('/motors', motorsRoutes); // Motors routes
router.use('/', customRoutes); // Custom routes
router.use('/', sedanRoutes); // Sedan routes
router.use('/', suvRoutes); // SUV routes
router.use('/', truckRoutes); // Truck routes

module.exports = router;
