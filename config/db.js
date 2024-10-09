const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL=postgresql,//cse340:VvfsoVT9G06Yd240a3pWVLp71egvL4gk@dpg-crr1mnqj1k6c73e8526g-a.oregon-postgres.render.com/cse340_kql_z7do
    // Load from .env file
    ssl: {
        rejectUnauthorized: false // Necessary for some remote PostgreSQL services like Render.com
    }
});

module.exports = pool;
