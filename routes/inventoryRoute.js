const express = require('express');
const router = express.Router();

// Define a route
router.get('/inventory', (req, res) => {
    res.send('Inventory list');
});

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// Export the router
module.exports = router;
