require("dotenv").config({path:"../.env"});
const {Pool} = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${parseInt(process.env.PORT)}/${process.env.DBNAME}`;

const pool = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        // user: process.env.DB_USER,
        // host: process.env.DB_HOST,
        // database: process.env.DATABASE,
        // password: process.env.DB_PASS,
        // port: parseInt(process.env.DB_PORT)
});

module.exports = {
        port: parseInt((process.env.EXPRESS_PORT)),
        pool
};