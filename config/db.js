const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Load connection string from the .env file
    ssl: {
        rejectUnauthorized: false // Important for services like Render.com
    }
});

module.exports = pool;