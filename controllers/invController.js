const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  const classificationSelect = await utilities.buildClassificationList();
  // Render the view and pass the nav variable along with others
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav, // Pass the nav variable here
    grid,
  });
};

// Move module.exports outside of the function
/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

module.exports = invCont;

// Example structure for invControllers.js
const Inventory = require('../models/inventory'); // Adjust based on your model structure

exports.getAllItems = (req, res) => {
    Inventory.find({}, (err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch items' });
        }
        res.json(items);
    });
};

// Add more functions as needed
