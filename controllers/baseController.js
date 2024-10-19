const utilities = require('../utilities/');
const baseController = {};

req.flash("notice", "This is a flash message.");
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav});
};

module.exports = baseController;
