import { Sequelize } from "sequelize";
// import connection
import db3 from "../config/database_aptOld.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const AptOldNojsUsers = db3.define("nojs_users", {
  nojs: {
    type: DataTypes.STRING,
  },
  site: {
    type: DataTypes.STRING,
  },
  provinsi: {
    type: DataTypes.STRING,
  },
  lc: {
    type: DataTypes.STRING,
  },
  mitra: {
    type: DataTypes.STRING,
  },
  ip: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.STRING,
  },
  longitude: {
    type: DataTypes.STRING,
  },
  id_lvdvsat: {
    type: DataTypes.INTEGER,
  },
  id_ping: {
    type: DataTypes.INTEGER,
  },
  id_batvolt: {
    type: DataTypes.INTEGER,
  },
  id_vsatcurr: {
    type: DataTypes.INTEGER,
  },
  id_btscurr: {
    type: DataTypes.INTEGER,
  },
  no_urut: {
    type: DataTypes.INTEGER,
  },
  ehub_version: {
    type: DataTypes.BOOLEAN,
  },
  panel2_type: {
    type: DataTypes.BOOLEAN,
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
export default AptOldNojsUsers;
