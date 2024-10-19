// inventoryRoute.js
const express = require("express");
const router = new express.Router();

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Simple test route (working fine)
router.get('/inventory', (req, res) => {
    res.send('Inventory data');
});
// Import the invController module
const invController = require('../controllers/invController');
// In inventoryRoutes.js
const { checkClassificationData } = require('../middleware/validation');
// Route to render the form
router.get('/add-classification', inventoryController.renderAddClassification);
// Route to handle form submission
router.post('/add-classification', checkClassificationData, inventoryController.addClassification);
//inv/getInventory/:classification_id
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));


module.exports = router;
