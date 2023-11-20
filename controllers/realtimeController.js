// Import model Product
import Realtime from "../models/Realtime.js";
import Degradasi from "../models/Degradasi.js";
import { Sequelize } from "sequelize";
const OP = Sequelize.Op;

// Get semua product
export const getRealtime = async (req, res) => {
  try {
    const response = await Realtime.findAll();
    res.send(response);
    // res.status(200).json({ msg: "sucess", data: response });
  } catch (err) {
    console.log(err);
  }
};

export const getSiteDown = async (req, res) => {
  try {
    const response = await Realtime.findAll({
      where: { downtime: { [Sequelize.Op.gt]: 10 } },
    });
    res.send(response);
    // res.status(200).json({ msg: "sucess", data: response });
  } catch (err) {
    console.log(err);
  }
};

export const getDataDegradasi = async (req, res) => {
  try {
    const response = await Degradasi.findAll();
    res.send(response);
    // res.status(200).json({ msg: "sucess", data: response });
  } catch (err) {
    console.log(err);
  }
};

export const createDegradasi = async (req, res) => {
  console.log("createDegradasi");
  try {
    // Using create method to insert a new record
    // const newData = {
    //   site_name: "example_site",
    //   charging_start_time: "2023-01-01 04:00:00", // Replace with the actual date and time
    //   batt_volt_start: 20.5, // Replace with the actual value for batt_volt_start
    //   charging_end_time: "2023-01-01 16:00:00", // Replace with the actual date and time
    //   batt_volt_end: 24.5, // Replace with the actual value for batt_volt_end
    //   volt_degradation: 24.5, // Replace with the actual value for batt_volt_end
    // };
    const createdRecord = await Degradasi.create(req.body);

    res.status(201).json({ msg: "success", data: createdRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message }); // Send the error message in the response
  }
};
