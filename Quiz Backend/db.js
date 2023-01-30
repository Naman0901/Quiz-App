const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "naman",
    database: "quiz",
    port: 5432
});

module.exports = pool;