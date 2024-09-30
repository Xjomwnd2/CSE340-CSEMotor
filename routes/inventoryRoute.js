const express = require('express');
const router = express.Router();

// Ensure this function is defined and imported correctly
const someController = require('../controllers/someController'); // Adjust the path as needed

// Define the route with a valid callback
router.get('/inventory', someController.getInventory); // Ensure getInventory is a valid function

module.exports = router;
