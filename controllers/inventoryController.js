// In inventoryController.js
const inventoryModel = require('../models/inventoryModel');
const { validationResult } = require('express-validator');
const express = require("express");
const router = express.Router();
const invModel = require("../models/inventory-model");
const utilities = require("../utilities");


// Function to render the add-classification form
exports.renderAddClassification = (req, res) => {
  res.render('inventory/add-classification', {
    title: 'Add New Classification',
    errors: null,
    message: req.flash('message'),
  });
};

// Function to handle classification form submission
exports.addClassification = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('inventory/add-classification', {
      title: 'Add New Classification',
      errors: errors.array(),
      message: null,
    });
  }

  try {
    const result = await inventoryModel.insertClassification(req.body.classificationName);

    // If insertion is successful, show success message and refresh navigation
    req.flash('message', 'Classification added successfully!');
    res.redirect('/inventory/management'); // Adjust according to your management view

  } catch (err) {
    res.render('inventory/add-classification', {
      title: 'Add New Classification',
      errors: [{ msg: 'Error inserting classification into the database' }],
      message: null,
    });
  }
};
