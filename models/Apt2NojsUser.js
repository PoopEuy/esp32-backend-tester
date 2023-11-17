import { Sequelize } from "sequelize";
// import connection
import dbapt2 from "../config/database_apt2.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const Apt2NojsUsers = dbapt2.define("nojs_users", {
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
  id_lvd_vsat: {
    type: DataTypes.INTEGER,
  },
  id_ping: {
    type: DataTypes.INTEGER,
  },
  id_batt_volt: {
    type: DataTypes.INTEGER,
  },
  id_vsat_curr: {
    type: DataTypes.INTEGER,
  },
  id_bts_curr: {
    type: DataTypes.INTEGER,
  },
  gs: {
    type: DataTypes.INTEGER,
  },
  darat: {
    type: DataTypes.STRING,
  },
  laut: {
    type: DataTypes.STRING,
  },
  udara: {
    type: DataTypes.STRING,
  },
  ehub_version: {
    type: DataTypes.STRING,
  },
  panel2_type: {
    type: DataTypes.STRING,
  },
  kota: {
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
export default Apt2NojsUsers;
