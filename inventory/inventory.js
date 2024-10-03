const express = require('express');
const router = express.Router();

// Example GET route for inventory
router.get('/', (req, res) => {
  res.send('Inventory List');
});

// Example POST route to add new inventory item
router.post('/add', (req, res) => {
  const newItem = req.body;
  // Add logic to save newItem to database or inventory list
  res.send('New inventory item added!');
});

module.exports = router;
