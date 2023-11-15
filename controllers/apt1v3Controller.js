// Import model Product
import Apt1v3NojsUsers from "../models/Apt1NojsUser.js";
import Apt1v3NojsLoggers from "../models/Apt1Loggers.js";
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

// Get all Apt1v3NojsUsers
export const getApt1v3NojsUser = async (req, res) => {
  try {
    const response = await Apt1v3NojsUsers.findAll();
    res.status(200).json({ msg: "success", data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message });
  }
};

export const getDegradasiApt1 = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Log the request body to see its structure

    const nojsId = req.body.nojsId;
    const timeStart = req.body.timeStart;
    const timeEnd = req.body.timeEnd;

    console.log("nojsId:", nojsId);
    console.log("timeStart:", timeStart);
    console.log("timeEnd:", timeEnd);

    const response = await Apt1v3NojsLoggers.findAll({
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

export const apt1FirstCharge = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Log the request body to see its structure

    const timeStart = "2023-11-09 04:00:00";
    const timeEnd = "2023-11-09 04:04:59";
    let jumlahSite;

    var arrDegrasi = [];

    const resSiteList = await Apt1v3NojsUsers.findAll({
      order: [["site", "ASC"]],
    });

    console.log("jumlah site : " + resSiteList.length);

    for (let i = 0; i < resSiteList.length; i++) {
      const siteName = resSiteList[i].site;
      const siteId = resSiteList[i].id;

      jumlahSite = resSiteList.length;
      console.log("listSite_id : " + siteId);
      console.log("listSite_name : " + siteName);

      const degResponse = await Apt1v3NojsLoggers.findAll({
        attributes: ["nojs_id", "ts", "batt_volt"],
        where: {
          nojs_id: siteId,
          ts: {
            [Op.between]: [timeStart, timeEnd],
          },
        },
        order: [["ts", "DESC"]],
      });
      console.log("degResponse.length : " + degResponse.length);

      // for (let j = 0; j < degResponse.length; j++) {
      //   const degIdSite = degResponse[j].nojs_id;
      //   const degTime = degResponse[j].ts;
      //   const degBattVolt = degResponse[j].batt_volt;
      //   console.log("jumlahSite : " + jumlahSite + " " + i);
      //   console.log("degSiteName : " + siteName);
      //   console.log("degIdSite : " + degIdSite);
      //   console.log("degTime : " + degTime);
      //   console.log("degBattVolt : " + degBattVolt);

      //   const payloadDegradasi = {
      //     time: degTime,
      //     site_name: siteName,
      //     batt_volt: degBattVolt,
      //   };
      //   arrDegrasi.push(payloadDegradasi);

      //   if (jumlahSite === j) {
      //     console.log("site terproses : " + j);
      //   }
      // }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message });
  }
};
