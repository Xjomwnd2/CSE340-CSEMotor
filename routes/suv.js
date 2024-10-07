// routes/suv.js
const express = require('express');
const router = express.Router();
const suvController = require('../controllers/suvController'); // Import the controller
// Route for getting SUV details
router.get('/suv', suvController.getSuvDetails);
module.exports = router;