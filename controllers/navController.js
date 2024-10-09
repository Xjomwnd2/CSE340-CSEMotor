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
