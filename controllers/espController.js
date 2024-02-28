import dotenv from "dotenv";
import axios from "axios";
import fetch from "node-fetch";

const espUrl = process.env.ESP_URL;
dotenv.config();

export const restartKey = async (req, res) => {
  const restart = req.body.restart;
  console.log("URL nya : " + espUrl);
  console.log("restartValue ");

  try {
    const response = await axios.post(`${espUrl}/api/restart`, {
      restart,
    });

    res.status(200).json({
      status: response.status,
      msg: "Restart Sukses",
    });
  } catch (error) {
    // console.error(error);
    console.log("HASIL ERROR : " + error.response.status);
    res.status(400).json({
      status: error.response.status,
      msg: "Restart Gagal",
      error: error.message,
    });
  }
};

export const getModbusInfo = async (req, res) => {
  try {
    const response = await axios.get(`${espUrl}/api/get-modbus-info`);
    console.log("getModbusInfo : " + JSON.stringify(response.data));
    res.status(200).json(response.data);
  } catch (error) {
    // console.error(error);
    // console.log("HASIL ERROR : " + error.response.status);
    res.status(400).json({
      // status: error.response.status,
      msg: "Get Modbus Info Gagal",
      error: error.message,
    });
  }
};

export const getDeviceInfo = async (req, res) => {
  try {
    const response = await axios.get(`${espUrl}/api/get-device-info`);
    console.log("getDeviceInfo : " + JSON.stringify(response.data));

    res.status(200).json(response.data);
  } catch (error) {
    // console.error(error);
    // console.log("HASIL ERROR : " + error.response.status);
    res.status(400).json({
      // status: error.response.status,
      msg: "Get Devce Info Gagal",
      error: error.message,
    });
  }
};

// export const getChunkData = async (req, res) => {
//   try {
//     const response = await axios.get(`${espUrl}/api/get-data`);
//     console.log("getChunkData : " + JSON.stringify(response.data));

//     res.status(200).json(response.data);
//   } catch (error) {
//     // console.error(error);
//     // console.log("HASIL ERROR : " + error.response.status);
//     res.status(400).json({
//       // status: error.response.status,
//       msg: "Get Devce Info Gagal",
//       error: error.message,
//     });
//   }
// };

//menggunaka fetch
export const getChunkData = async (req, res) => {
  try {
    const response = await fetch(`${espUrl}/api/get-data`);
    if (!response.ok) {
      throw new Error("getChunkData Failed");
    }
    const data = await response.json(); // assuming response is JSON
    // Handle the data received
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch getChunkData error:", error);
  }
};
