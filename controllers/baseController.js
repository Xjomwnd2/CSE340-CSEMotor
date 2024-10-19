const utilities = require('../utilities/');
const baseController = {};

req.flash("notice", "This is a flash message.")
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
};

module.exports = baseController

// controllers/baseController.js

exports.someFunction = (req, res) => {
  // Use req.flash() correctly within the request handler
  req.flash("notice", "This is a flash message.");
  res.redirect('/some-route'); // Redirect after setting the flash message
};
