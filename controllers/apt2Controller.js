// Import model Product
import Apt2NojsLoggers from "../models/Apt2Loggers.js";
import Apt2NojsUsers from "../models/Apt2NojsUser.js";
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

// Get all Apt2NojsUsers
export const getApt2NojsUser = async (req, res) => {
  try {
    const response = await Apt2NojsUsers.findAll({
      order: [["site", "ASC"]],
    });
    res.status(200).json({ msg: "success", data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message });
  }
};

export const getDataChargeApt2 = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Log the request body to see its structure

    const nojsId = req.body.nojsId;
    const timeStart = req.body.timeStart;
    const timeEnd = req.body.timeEnd;

    console.log("nojsId:", nojsId);
    console.log("timeStart:", timeStart);
    console.log("timeEnd:", timeEnd);

    const response = await Apt2NojsLoggers.findAll({
      attributes: ["nojs_id", "ts", "batt_volt"],
      where: {
        nojs_id: nojsId,
        ts: {
          [Op.between]: [timeStart, timeEnd],
        },
      },
      order: [["ts", "DESC"]],
    });

    res.status(200).json({ msg: "success", data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message });
  }
};

export const apt2ChargeData = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date for day -1 (yesterday)
    const dayMinusOne = new Date(currentDate);
    dayMinusOne.setDate(currentDate.getDate() - 1);

    const formatTanggal = formatDate(dayMinusOne);

    const timeStart1 = formatTanggal + " 04:00:00";
    const timeStart2 = formatTanggal + " 04:04:59";

    const timeEnd1 = formatTanggal + " 16:00:00";
    const timeEnd2 = formatTanggal + " 16:04:59";

    console.log("timeStart1 : " + timeStart1);
    console.log("timeStart2 : " + timeStart2);

    console.log("timeEnd1 : " + timeEnd1);
    console.log("timeEnd2 : " + timeEnd2);

    let jumlahSite;
    let counterSiteStart = 0;

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

    const resSiteList = await Apt2NojsUsers.findAll({
      order: [["site", "ASC"]],
    });

    console.log("jumlah site : " + resSiteList.length);

    for (let i = 0; i < resSiteList.length; i++) {
      const siteName = resSiteList[i].site;
      const siteId = resSiteList[i].id;

      jumlahSite = resSiteList.length;
      console.log("listSite_id : " + siteId);
      console.log("listSite_name : " + siteName);

      //startChargeGetData
      const startCharge = await Apt2NojsLoggers.findAll({
        attributes: ["nojs_id", "ts", "batt_volt"],
        where: {
          nojs_id: siteId,
          batt_volt: {
            [Op.not]: null,
          },
          ts: {
            [Op.between]: [timeStart1, timeStart2],
          },
        },
        order: [["ts", "DESC"]],
      });

      const endCharge = await Apt2NojsLoggers.findAll({
        attributes: ["nojs_id", "ts", "batt_volt"],
        where: {
          nojs_id: siteId,
          batt_volt: {
            [Op.not]: null,
          },
          ts: {
            [Op.between]: [timeEnd1, timeEnd2],
          },
        },
        order: [["ts", "DESC"]],
      });

      console.log("startCharge.length : " + startCharge.length);
      console.log("startCharge.length : " + endCharge.length);

      if (startCharge.length === 0) {
        timeStartCharge = timeStart1;
        siteNameStartCharge = siteName;
        battVoltStartCharge = -1;

        console.log("lengstart 0");
      } else {
        timeStartCharge = startCharge[0].ts;
        siteNameStartCharge = siteName;
        battVoltStartCharge = startCharge[0].batt_volt;
      }

      if (endCharge.length === 0) {
        timeEndCharge = timeEnd1;
        siteNameEndCharge = siteName;
        battVoltEndCharge = -1;

        console.log("lengend 0");
      } else {
        timeEndCharge = endCharge[0].ts;
        siteNameEndCharge = siteName;
        battVoltEndCharge = endCharge[0].batt_volt;
      }

      if (startCharge.length === 0 || endCharge.length === 0) {
        voltDegradationFix = -1;

        console.log("masuk dragation -1");
      } else {
        voltDegradation = battVoltEndCharge - battVoltStartCharge;
        voltDegradationFix = voltDegradation.toFixed(2);
      }

      // const voltDegradation = battVoltEndCharge - battVoltStartCharge;
      // const voltDegradationFix = voltDegradation.toFixed(2);

      const chargeData = {
        siteID: siteId,
        siteName: siteName,
        // siteNameStart: siteNameStartCharge,
        timeStart: timeStartCharge,
        battVoltStart: battVoltStartCharge,
        // siteNameEnd: siteNameEndCharge,
        timeEnd: timeEndCharge,
        battVoltEnd: battVoltEndCharge,
        voltDegradation: voltDegradationFix,
      };

      arrChargeData.push(chargeData);
      counterSiteStart = counterSiteStart + 1;
      if (jumlahSite === counterSiteStart) {
        console.log(
          "kirim response, jumlah site :  " +
            jumlahSite +
            " " +
            counterSiteStart
        );

        res.status(200).json({ msg: "success", data: arrChargeData });
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
