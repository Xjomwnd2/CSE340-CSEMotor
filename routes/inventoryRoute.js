// Needed Resources 
const express = require("express");
const router = new express.Router(); 
const invController = require("../controllers/invController");
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Ensure that this route has a proper callback function
router.get('/inventory', (req, res) => {
    res.send('Inventory data');
  });

module.exports = router;