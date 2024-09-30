const express = require('express');
const router = express.Router();

// Define a route
router.get('/inventory', (req, res) => {
    res.send('Inventory list');
});

// Export the router
module.exports = router;
