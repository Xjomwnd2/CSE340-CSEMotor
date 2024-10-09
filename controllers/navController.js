// controllers/navController.js
const { getNavigationItems } = require('../models/navModel');

// Function to build the navigation
async function buildNavigation() {
    try {
        const navItems = await getNavigationItems();
        return navItems;
    } catch (error) {
        console.error("Error building navigation:", error);
        return [];
    }
}

module.exports = { buildNavigation };

const buildByClassificationId = async (req, res) => {
    try {
      const classificationId = req.params.classificationId;
      console.log("Classification ID:", classificationId);
  
      // Execute the query and get the data
      const data = await inventoryModel.getInventoryByClassificationId(classificationId);
  
      // Check if the data is returned and if it's not empty
      if (data && data.length > 0) {
        // Proceed with the rest of your logic
        const className = data[0].classification_name;
        res.render("inventoryPage", { title: className, data });
      } else {
        // Handle the case when no data is returned
        console.error("No data found for classification ID:", classificationId);
        res.status(404).send("No inventory found for the selected classification.");
      }
    } catch (err) {
      // Handle any unexpected errors
      console.error("Error in buildByClassificationId:", err);
      res.status(500).send("Server error");
    }
  };
  