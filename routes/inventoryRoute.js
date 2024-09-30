// Needed Resources // inventoryRoute.js
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController"); // Check the path is correct

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Ensure that this route has a proper callback function
router.get('/inventory', (req, res) => {
    res.send('Inventory data');
});

module.exports = router;
