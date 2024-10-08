// config/db.js
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

// Create a new pool for connecting to PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URLL=postgresql,//cse340:VvfsoVT9G06Yd240a3pWVLp71egvL4gk@dpg-crr1mnqj1k6c73e8526g-a.oregon-postgres.render.com/cse340_kql_z7do
        rejectUnauthorized: false, // For hosted DB on Render
    },
);

module.exports = {
    query: (text, params) => pool.query(text, params),
};
