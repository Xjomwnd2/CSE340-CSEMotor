const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Load from .env file
    ssl: {
        rejectUnauthorized: false // Important for services like Render.com
    }
});

module.exports = pool;

