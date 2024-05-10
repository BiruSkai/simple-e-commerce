require("dotenv").config();
const {Pool} = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.POSTGRES_PORT}/${process.env.DATABASE}`;

const pool = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
                rejectUnauthorized: false
        }
});

module.exports = {
        port: parseInt(process.env.DB_PORT, 10),
        pool
};