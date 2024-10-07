// routes/sedan.js
const express = require('express');
const router = express.Router();
const sedanController = require('../controllers/sedanController'); // Import the controller
// Route for getting sedan details
router.get('/sedan', sedanController.getSedanDetails);
module.exports = router;