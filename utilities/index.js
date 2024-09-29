const invModel = require("../models/inventory-model");
const Util = {};

Util.getNav = async function () {
  let data = null; // Initialize data outside the try block
  try {
    data = await invModel.find();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = Util;