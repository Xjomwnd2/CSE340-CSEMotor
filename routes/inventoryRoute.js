// routes/inventoryRoute.js

const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Route to get all inventory items
router.get('/', inventoryController.getAllItems);

// Route to get a single inventory item by ID
router.get('/:id', inventoryController.getItemById);

// Route to add a new inventory item
router.post('/', inventoryController.addItem);

// Route to update an inventory item by ID
router.put('/:id', inventoryController.updateItem);

// Route to delete an inventory item by ID
router.delete('/:id', inventoryController.deleteItem);

module.exports = router;

