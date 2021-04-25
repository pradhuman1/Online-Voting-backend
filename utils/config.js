const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'online_voting',
    password: 'password',
    port: 5433,
    idleTimeoutMillis: 10,
    
});

exports.pool = pool;