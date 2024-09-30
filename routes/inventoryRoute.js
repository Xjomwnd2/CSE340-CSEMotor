const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController"); // Ensure the path is correct

// Route to build inventory by classification view
// Check if invController.buildByClassificationId is defined
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to get inventory data
router.get('/inventory', (req, res) => {
    res.send('Inventory data');
});

module.exports = router; // Ensure you export the router