// import express
import express from "express";

// import page controller
import { Home, About, Contact, botStart } from "../controllers/page.js";
import { getRealtime, getSiteDown } from "../controllers/realtimeController.js";
import {
  getApt1v3NojsUser,
  getDegradasiApt1,
  apt1ProsesDegradasi,
  dayMinusOne,
} from "../controllers/apt1v3Controller.js";

import {
  getApt2NojsUser,
  getDegradasiApt2,
  apt2ProsesDegradasi,
} from "../controllers/apt2Controller.js";

import {
  getApt1Old,
  startDegradasiApt1Old,
  apt1OldProsesDegradasi,
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
router.post("/getDegradasiApt1", getDegradasiApt1);
router.get("/apt1ProsesDegradasi", apt1ProsesDegradasi);
router.get("/dayMinusOne", dayMinusOne);
dayMinusOne;

// Degradasi  Apt2 routes
router.get("/nojsUserApt2", getApt2NojsUser);
router.post("/getDegradasiApt2", getDegradasiApt2);
router.get("/apt2ProsesDegradasi", apt2ProsesDegradasi);

//realtime
router.post("/createDegradasi", createDegradasi);

//apt1Old
router.get("/getApt1Old", getApt1Old);
router.get("/startDegradasiApt1Old", startDegradasiApt1Old);
router.get("/apt1OldProsesDegradasi", apt1OldProsesDegradasi);

//prosesController
router.get("/createDegradasiAptOld", createDegradasiAptOld);

// export default router
export default router;
