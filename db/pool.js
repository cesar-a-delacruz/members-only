const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
module.exports = new Pool({
  connectionString:
    "postgresql://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_HOST +
    "/" +
    process.env.DB_NAME +
    "?sslmode=require&channel_binding=require",
});
