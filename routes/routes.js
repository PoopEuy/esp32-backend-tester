// import express
import express from "express";

// import page controller
import { Home, About, Contact, botStart } from "../controllers/page.js";
import { getRealtime, getSiteDown } from "../controllers/realtimeController.js";
import {
  getApt1v3NojsUser,
  getDegradasiApt1,
  apt1FirstCharge,
} from "../controllers/apt1v3Controller.js";

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
router.post("/degradasiApt1", getDegradasiApt1);

router.get("/apt1FirstCharge", apt1FirstCharge);
// export default router
export default router;
