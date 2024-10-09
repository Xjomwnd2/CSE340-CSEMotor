// models/navModel.js
const db = require('../config/db');

// Fetch navigation items from the PostgreSQL database
async function getNavigationItems() {
    try {
        const result = await db.query('SELECT name, link FROM navigation');
        return result.rows; // Return the rows from the query
    } catch (err) {
        console.error('Error fetching navigation items:', err);
        throw err;
    }
}

module.exports = { getNavigationItems };
