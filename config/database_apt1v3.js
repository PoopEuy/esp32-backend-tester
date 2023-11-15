import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const username = process.env.USER_APT1V3;
const password = process.env.PASSWORD_APT1V3;
const database = process.env.DATABASE_APT1V3;
const host = process.env.DB_HOST_APT1V3;
const dialect = process.env.DB_CONNECTION_APT1V3;
const port = process.env.DB_PORT_EXPOSE_APT1V3;

console.log("dataenv : " + username);

// Make sure all required environment variables are present
if (!username || !password || !database || !host || !dialect || !port) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const db2 = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port, // Add port configuration
});

// Test the database connection
db2
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// export connection
export default db2;
