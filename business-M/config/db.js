const {Pool} = require("pg");

const pool = new Pool({
    host: "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

module.exports = pool;
