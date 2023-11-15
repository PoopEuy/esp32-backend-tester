import { Sequelize } from "sequelize";
// import connection
import db2 from "../config/database_apt1v3.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const Apt1v3NojsLoggers = db2.define("nojs_loggers", {
  ts: {
    type: DataTypes.STRING,
  },
  nojs_id: {
    type: DataTypes.INTEGER,
  },
  batt_volt: {
    type: DataTypes.FLOAT,
  },
  cpu_temp: {
    type: DataTypes.FLOAT,
  },
  dock_active: {
    type: DataTypes.STRING,
  },
  load1: {
    type: DataTypes.FLOAT,
  },
  load2: {
    type: DataTypes.FLOAT,
  },
  load3: {
    type: DataTypes.FLOAT,
  },
  dock_cell_id: {
    type: DataTypes.INTEGER,
  },
  energy_id: {
    type: DataTypes.INTEGER,
  },
  statistics_id: {
    type: DataTypes.INTEGER,
  },
  pv_id: {
    type: DataTypes.INTEGER,
  },
  bspwatt: {
    type: DataTypes.INTEGER,
  },
  mcb_voltage: {
    type: DataTypes.FLOAT,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
  },
});

// Export model Realtime
export default Apt1v3NojsLoggers;

// (async () => {
//   await db.sync({ alter: false });
// })();
