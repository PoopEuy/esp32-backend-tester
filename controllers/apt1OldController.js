// Import model Product

import AptOldNojsUsers from "../models/AptOldNojsUser.js";
import AptOldLoggers from "../models/Apt1OldLoggers.js";
import Degradasi from "../models/degradasi.js";
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

// Get oldapt1
export const getApt1Old = async (req, res) => {
  try {
    const response = await AptOldNojsUsers.findAll({
      attributes: ["nojs", "site"],
      where: {
        ehub_version: false,
      },
      order: [["site", "ASC"]],
    });

    res.status(200).json({ msg: "success", data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message });
  }
};

export const startDegradasiApt1Old = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Log the request body to see its structure

    const nojs = "JS73";
    const timeStart1 = "2023-11-09 04:00:00";
    const timeStart2 = "2023-11-09 04:04:59";

    const timeEnd1 = "2023-11-09 16:00:00";
    const timeEnd2 = "2023-11-09 16:04:59";

    const response = await AptOldLoggers.findAll({
      attributes: ["nojs", "time_local", "batt_volt1"],
      where: {
        nojs: nojs,
        time_local: {
          [Op.between]: [timeStart1, timeStart2],
        },
      },
      order: [["time_local", "DESC"]],
    });

    res.status(200).json({ msg: "success", data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message });
  }
};

export const apt1OldProsesDegradasi = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Log the request body to see its structure

    // Get the current date
    const currentDate = new Date();

    // Calculate the date for day -1 (yesterday)
    const dayMinusOne = new Date(currentDate);
    dayMinusOne.setDate(currentDate.getDate() - 1);

    const dayNow = new Date(currentDate);
    dayNow.setDate(currentDate.getDate());

    const formatTanggal = formatDate(dayMinusOne);
    const formatToday = formatDate(dayNow);

    const timeStart1 = formatToday + " 04:00:00";
    const timeStart2 = formatToday + " 04:04:59";

    const timeEnd1 = formatTanggal + " 16:00:00";
    const timeEnd2 = formatTanggal + " 16:04:59";

    console.log("timeStart1 : " + timeStart1);
    console.log("timeStart2 : " + timeStart2);

    console.log("timeEnd1 : " + timeEnd1);
    console.log("timeEnd2 : " + timeEnd2);

    let jumlahSite;
    let counterSite = 0;

    let timeStartCharge;
    let siteNameStartCharge;
    let battVoltStartCharge;

    let timeEndCharge;
    let siteNameEndCharge;
    let battVoltEndCharge;

    let voltDegradation;
    let voltDegradationFix;

    var arrDegrasiStart = [];
    let arrChargeData = [];

    const resSiteList = await AptOldNojsUsers.findAll({
      attributes: ["nojs", "site"],
      where: {
        ehub_version: false,
      },
      order: [["site", "ASC"]],
    });

    console.log("jumlah site : " + resSiteList.length);

    for (let i = 0; i < resSiteList.length; i++) {
      const siteName = resSiteList[i].site;
      const siteNojs = resSiteList[i].nojs;

      jumlahSite = resSiteList.length;
      console.log("listSite_nojs : " + siteNojs);
      console.log("listSite_name : " + siteName);

      //startChargeGetData
      const startCharge = await AptOldLoggers.findAll({
        attributes: ["nojs", "time_local", "batt_volt1"],
        where: {
          nojs: siteNojs,
          time_local: {
            [Op.between]: [timeStart1, timeStart2],
          },
        },
        order: [["time_local", "DESC"]],
      });

      const endCharge = await AptOldLoggers.findAll({
        attributes: ["nojs", "time_local", "batt_volt1"],
        where: {
          nojs: siteNojs,
          time_local: {
            [Op.between]: [timeEnd1, timeEnd2],
          },
        },
        order: [["time_local", "DESC"]],
      });

      console.log("startCharge.length : " + startCharge.length);
      console.log("startCharge.length : " + endCharge.length);

      if (startCharge.length === 0) {
        timeStartCharge = timeStart1;
        siteNameStartCharge = siteName;
        battVoltStartCharge = -1;
      } else {
        timeStartCharge = startCharge[0].time_local;
        siteNameStartCharge = siteName;
        battVoltStartCharge = startCharge[0].batt_volt1 / 100;
      }

      if (endCharge.length === 0) {
        timeEndCharge = timeEnd1;
        siteNameEndCharge = siteName;
        battVoltEndCharge = -1;
      } else {
        timeEndCharge = endCharge[0].time_local;
        siteNameEndCharge = siteName;
        battVoltEndCharge = endCharge[0].batt_volt1 / 100;
      }

      if (startCharge.length === 0 || endCharge.length === 0) {
        voltDegradationFix = -1;

        console.log("masuk dragation -1");
      } else {
        voltDegradation = battVoltEndCharge - battVoltStartCharge;
        voltDegradationFix = voltDegradation.toFixed(2);
      }

      //   const voltDegradation = battVoltEndCharge - battVoltStartCharge;
      //   const voltDegradationFix = voltDegradation.toFixed(2);

      // const chargeData = {
      //   siteNojs: siteNojs,
      //   siteName: siteName,
      //   // siteNameStart: siteNameStartCharge,
      //   timeStart: timeStartCharge,
      //   battVoltStart: battVoltStartCharge,
      //   // siteNameEnd: siteNameEndCharge,
      //   timeEnd: timeEndCharge,
      //   battVoltEnd: battVoltEndCharge,
      //   voltDegradation: voltDegradationFix,
      // };

      const chargeData = {
        site_name: siteName,
        charging_start_time: timeStartCharge, // Replace with the actual date and time
        batt_volt_start: battVoltStartCharge, // Replace with the actual value for batt_volt_start
        charging_end_time: timeEndCharge, // Replace with the actual date and time
        batt_volt_end: battVoltEndCharge, // Replace with the actual value for batt_volt_end
        volt_degradation: voltDegradationFix, // Replace with the actual value for batt_volt_end
      };
      const createDegradasi = await Degradasi.create(chargeData);

      arrChargeData.push(createDegradasi);
      counterSite = counterSite + 1;
      if (jumlahSite === counterSite) {
        console.log(
          "kirim response, jumlah site :  " + jumlahSite + " " + counterSite
        );

        res.status(200).json({
          msg: "success Create Degradasi Old",
          totalSite: counterSite,
          data: arrChargeData,
        });
      } else {
        console.log("belum kirim response");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message });
  }
};

function formatDate(date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
