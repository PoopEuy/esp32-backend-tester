// import express
import express from "express";

// import page controller
import { Home, About, Contact, botStart } from "../controllers/page.js";
import { getRealtime, getSiteDown } from "../controllers/realtimeController.js";
import {
  getApt1v3NojsUser,
  getDataChargeApt1,
  apt1ChargeData,
  dayMinusOne,
} from "../controllers/apt1v3Controller.js";

import {
  getApt2NojsUser,
  getDataChargeApt2,
  apt2ChargeData,
} from "../controllers/apt2Controller.js";

import {
  getApt1Old,
  startChargeApt1Old,
  apt1OldChargeData,
} from "../controllers/apt1OldController.js";
import { createDegradasi } from "../controllers/realtimeController.js";

import { createDegradasiAptOld } from "../controllers/prosesController.js";

// init express router
const router = express.Router();

// Home route
router.get("/", Home);

// About route
router.get("/about", About);

// Contact route
router.get("/contact", Contact);

// Start Bot
router.get("/botStart", botStart);

// Realtime routes
router.get("/realtime", getRealtime);
router.get("/siteDown", getSiteDown);

// Degradasi  Apt1 routes
router.get("/nojsUserApt1v3", getApt1v3NojsUser);
router.post("/getDataChargeApt1", getDataChargeApt1);
router.get("/apt1ChargeData", apt1ChargeData);
router.get("/dayMinusOne", dayMinusOne);
dayMinusOne;

// Degradasi  Apt2 routes
router.get("/nojsUserApt2", getApt2NojsUser);
router.post("/getDataChargeApt2", getDataChargeApt2);
router.get("/apt2ChargeData", apt2ChargeData);

//realtime
router.post("/createDegradasi", createDegradasi);

//apt1Old
router.get("/getApt1Old", getApt1Old);
router.get("/startChargeApt1Old", startChargeApt1Old);
router.get("/apt1OldChargeData", apt1OldChargeData);

//prosesController
router.get("/createDegradasiAptOld", createDegradasiAptOld);

// export default router
export default router;
