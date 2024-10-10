// Set up the connection pool for PostgreSQL
const pool = new Pool({
    user: 'your_pg_user',  // Your PostgreSQL user
    host: 'localhost',     // PostgreSQL host
    database: 'motors_db', // Your database name
    password: 'your_password', // Your database password
    port: 5432,            // PostgreSQL port
  });

  module.exports = pool;