import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const username = process.env.USER_APT2;
const password = process.env.USPASSWORD_APT2;
const database = process.env.DATABASE_APT2;
const host = process.env.DB_HOST_APT2;
const dialect = process.env.DB_CONNECTION_APT2;
const port = process.env.DB_PORT_EXPOSE_APT2;

console.log("database : " + database);

// Make sure all required environment variables are present
if (!username || !password || !database || !host || !dialect || !port) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const dbapt2 = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port, // Add port configuration
});

// Test the database connection
dbapt2
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// export connection
export default dbapt2;
