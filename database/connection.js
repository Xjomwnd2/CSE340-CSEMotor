const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

// Create a new pool instance
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // Default is usually 5432
});

// Test the connection
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.stack);
    } else {
        console.log('PostgreSQL connected successfully');
    }
});

module.exports = pool; // Export the pool for use in other files
