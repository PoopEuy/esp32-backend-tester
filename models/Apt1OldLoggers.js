import { Sequelize } from "sequelize";
// import connection
import db3 from "../config/database_aptOld.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const AptOldLoggers = db3.define("nojs_loggers", {
  time_local: {
    type: DataTypes.STRING,
  },
  nojs: {
    type: DataTypes.STRING,
  },
  eh1: {
    type: DataTypes.INTEGER,
  },
  eh2: {
    type: DataTypes.INTEGER,
  },
  vsat_curr: {
    type: DataTypes.INTEGER,
  },
  bts_curr: {
    type: DataTypes.INTEGER,
  },
  load3: {
    type: DataTypes.INTEGER,
  },
  batt_volt1: {
    type: DataTypes.INTEGER,
  },
  batt_volt2: {
    type: DataTypes.INTEGER,
  },
  edl1: {
    type: DataTypes.INTEGER,
  },
  edl2: {
    type: DataTypes.INTEGER,
  },
  pms_state: {
    type: DataTypes.STRING,
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
export default AptOldLoggers;
