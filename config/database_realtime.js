import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const username = process.env.USER_GRAFANA;
const password = process.env.PASSWORD_GRAFANA;
const database = process.env.DATABASE_GRAFANA;
const host = process.env.DB_HOST_GRAFANA;
const dialect = process.env.DB_CONNECTION_GRAFANA;
const port = process.env.DB_PORT_EXPOSE_GRAFANA;

// Make sure all required environment variables are present
if (!username || !password || !database || !host || !dialect || !port) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const db = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port, // Add port configuration
});

// Test the database connection
db.authenticate()
  .then(() => {
    console.log("Connection Apt1v3 has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// export connection
export default db;
