// inventoryRoute.js
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Simple test route (working fine)
router.get('/inventory', (req, res) => {
    res.send('Inventory data');
});
module.exports = router;
