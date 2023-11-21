import { Sequelize } from "sequelize";
// import connection
import db from "../config/database_realtime.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const Degradasi = db.define(
  "degradasi",
  {
    // Define attributes
    site_name: {
      type: DataTypes.STRING,
    },
    charging_start_time: {
      type: DataTypes.STRING,
    },
    batt_volt_start: {
      type: DataTypes.DOUBLE,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    note: {
      type: DataTypes.STRING,
    },
    charging_end_time: {
      type: DataTypes.STRING,
    },
    batt_volt_end: {
      type: DataTypes.DOUBLE,
    },

    volt_degradation: {
      type: DataTypes.DOUBLE,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at", // specify the name of the createdAt column
    updatedAt: false,
  }
);

// Export model Degradasi
export default Degradasi;

// (async () => {
//   await db.sync({ alter: false });
// })();
