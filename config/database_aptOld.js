import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const username = process.env.USER_APTOLD;
const password = process.env.PASSWORD_APT1OLD;
const database = process.env.DATABASE_APTOLD;
const host = process.env.DB_HOST_APTOLD;
const dialect = process.env.DB_CONNECTION_APTOLD;
const port = process.env.DB_PORT_EXPOSE_APTOLD;

console.log("dataenv : " + username);

// Make sure all required environment variables are present
if (!username || !password || !database || !host || !dialect || !port) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const db3 = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port, // Add port configuration
});

// Test the database connection
db3
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// export connection
export default db3;
