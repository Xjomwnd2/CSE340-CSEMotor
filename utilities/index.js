const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try {
    let data = await invModel.getClassifications(); // Fetch classifications data
    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';

    // Loop through classifications and build the list items
    data.rows.forEach((row) => {
      list += "<li>";
      list +=
        '<a href="/inv/type/' +
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        ' vehicles">' +
        row.classification_name +
        "</a>";
      list += "</li>";
    });

    list += "</ul>";
    return list; // Return the constructed HTML list
  } catch (error) {
    console.error("Error building the navigation:", error);
    throw error; // Pass the error to the next middleware
  }
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid = ''; // Initialize grid

  // Check if there are vehicles in the data
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += '<li>';
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View ' +
              vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' +
              '<img src="' + vehicle.inv_thumbnail + '" alt="Image of ' +
              vehicle.inv_make + ' ' + vehicle.inv_model +
              ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += '<hr />';
      grid += '<h2>';
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View ' +
              vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' +
              vehicle.inv_make + ' ' + vehicle.inv_model + '</a>';
      grid += '</h2>';
      grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
      grid += '</div>';
      grid += '</li>';
    });
    grid += '</ul>';
  } else {
    // Handle case where no vehicles were found
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid; // Return the grid HTML
};

module.exports = Util;
